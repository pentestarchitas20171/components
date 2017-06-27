const {camelCase, pascalCase} = require('change-case');
const {queue} = require('async');
const sax = require('sax');
const mkdirp = require('mkdirp-promise');
const fs = require('fs');
const path = require('path');
const walk = require('walk-promise');
const minimist = require('minimist');
const SVGO = require('svgo');
const stream = require('stream');
const whiteList = require('../icons');

const MAX_SIMULTANEOUS_HANDLES = 100;

const readQueue = queue(
  ({fileName}, done) => fs.readFile(fileName, 'utf8', done)
, MAX_SIMULTANEOUS_HANDLES);

const writeQueue = queue(
  ({fileName, data}, done) => fs.writeFile(fileName, data, done)
, MAX_SIMULTANEOUS_HANDLES);


const writeFile = (fileName, data) => new Promise(
  (resolve, reject) => writeQueue.push({fileName, data}, (err) => {
    if (err) reject(err);

    resolve();
  })
);

const formatAsFillColor = () => 'fill={activeColor}';
const formatAsOutline = () => 'stroke={activeOutline} strokeWidth={activeOutlineWidth}';
const keepOriginalFormat = (name, value) => `${camelCase(name)}="${value}"`;

const formatAttributes = (attributes, outlineBlock = false) => {
  const formatAttribute = (name, value) => {
    const formater = (
      (name === 'fill' && value != 'none' && !outlineBlock && formatAsFillColor)
      || (name === 'fill' && value != 'none' && outlineBlock && formatAsOutline)
      || keepOriginalFormat
    );

    return formater(name, value);
  };

  const expressions = Object.keys(attributes)
    .filter(name => name !== 'id')
    .map(name => formatAttribute(name, attributes[name]))
    .join(' ');

  return expressions.length > 0 ? ` ${expressions}` : '';
};

const componentize = async (basename, svgData) => {
  const inputStream = new stream.Readable();
  const componentName = `Nova${pascalCase(basename).replace('_', '')}`;
  const saxStream = sax.createStream(true, {lowercase: true});
  const meta = {
    indent: 12,
    open: false,
    done: false,
    data: '',
    svgContent: []
  };

  const writeLine = line => {
    meta.data += `${line || ''}\n`;
  };

  const writeIndentedLine = line => writeLine(
    `${Array(meta.indent).fill().map((_, i) => ' ').join('')}${line}`
  );

  const writeSVGTag = opts => {
    const {
      name,
      attributes,
      closing = false,
      autoclosing = false,
      outlineBlock = false,
    } = opts;

    if (autoclosing) {
      writeIndentedLine(`<${name}${formatAttributes(attributes, outlineBlock)} />`);
    } else if (closing) {
      meta.indent -= 2;
      writeIndentedLine(`</${name}>`);
    } else {
      writeIndentedLine(`<${name}${formatAttributes(attributes, outlineBlock)}>`);
      meta.indent += 2;
    }

    if (outlineBlock) meta.svgContent.push(opts);
  };

  saxStream.on('opentag', ({name, attributes}) => {
    if (name === 'svg' && !meta.done) {
      writeLine(`import React, {Component} from 'react';`);
      writeLine(`import IconBase from 'react-icon-base';`);
      writeLine();
      writeLine(`class ${componentName} extends Component {`);
      writeLine();
      writeLine(`  constructor(props) {`);
      writeLine(`    super(props);`);
      writeLine(`    this.state = {hovering: false};`);
      writeLine(`    this.handleMouseEnter = () => this.setState({hovering: true});`);
      writeLine(`    this.handleMouseLeave = () => this.setState({hovering: false});`);
      writeLine(`  }`);
      writeLine();
      writeLine(`  render() {`);
      writeLine(`    const {color = '#757575', outline = null, outlineWidth = 1, ...baseProps} = this.props;`);
      writeLine(`    const {hoverColor = color, hoverOutline = outline, hoverOutlineWidth = outlineWidth} = this.props;`);
      writeLine(`    const activeColor = this.state.hovering ? hoverColor : color;`);
      writeLine(`    const activeOutline = this.state.hovering ? hoverOutline : outline;`);
      writeLine(`    const activeOutlineWidth = this.state.hovering ? hoverOutlineWidth : outlineWidth;`);
      writeLine();
      writeLine(`    return (`);
      writeLine(`      <IconBase viewBox="${attributes.viewBox}" {...baseProps} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>`);
      writeLine(`        {activeOutline ? (`);
      writeLine(`          <g>`);

      meta.open = true;
    } else if (meta.open) {
      if (name === 'g') {
        writeSVGTag({name, attributes, outlineBlock: true});
      } else {
        writeSVGTag({name, attributes, outlineBlock: true, autoclosing: true});
      }
    }
  });

  saxStream.on('closetag', name => {
    if (name === 'svg') {
      meta.open = false;
      meta.done = true;
      meta.indent = 8;
      writeLine(`          </g>`);
      writeLine(`        ) : null}`);
      meta.svgContent.forEach(opts => writeSVGTag(Object.assign(opts, {outlineBlock: false})));
      writeLine(`      </IconBase>`);
      writeLine(`    );`);
      writeLine(`  }`);
      writeLine(`}`);
      writeLine();
      writeLine(`export default ${componentName};`);
    } else if (meta.open) {
      if (name === 'g') {
        writeSVGTag({name, closing: true, outlineBlock: true});
      }
    }
  });

  inputStream.pipe(saxStream);
  inputStream.push(svgData);
  inputStream.push(null);

  return new Promise(resolve => inputStream.on('end', () => resolve(meta.data)));
};

const optimizeSVG = fileName => new Promise(
  resolve => (
    readQueue.push({fileName}, (err, input) => {
      const svgo = new SVGO();

      svgo.optimize(input, ({data}) => resolve(data));
    })
  )
);

const generateComponent = async ({destDir, dest, src, basename}) => {
  const optimizedSVG = await optimizeSVG(src);
  const componentFeed = await componentize(basename, optimizedSVG);

  await mkdirp(destDir);
  await writeFile(dest, componentFeed);
};

const generateComponents = async ({novaPath, category}) => {
  const srcPath = path.join(novaPath, 'SVG', category.src);
  const files = await walk(srcPath);
  const tasks = files
    .filter(({name}) => name.match(/\.svg$/))
    .map(async ({root, name}) => {
      const src = path.join(root, name);
      const subcat = path.basename(path.dirname(src))
        .match(/^([0-9]+\-)?(.*)$/)[2]
        .toLowerCase()
        .replace('&', '-and-');
      const destDir = path.join(__dirname, '..', 'src', category.dest, subcat);
      const basename = path.basename(src, '.svg');
      const dest = path.join(destDir, `${basename}.js`);
      const importName = path.join(`@coorpacademy/nova-icons/${category.dest}/${subcat}/${basename}`);
      const isWhiteListed = whiteList.indexOf(importName) >= 0;

      return isWhiteListed ? generateComponent({destDir, dest, src, basename}) : null;
    });

  return Promise.all(tasks);
};

const runScript = async () => {
  const argv = minimist(process.argv.slice(2));
  const [novaPath = path.join(__dirname, '..', 'third-party', 'Nova-Icons')] = argv._;

  return Promise.all(['Solid icons', 'Line icons', 'Composition icons'].map(
    src => generateComponents({
      novaPath,
      category: {
        src,
        dest: src.split(' ')[0].toLowerCase()
      }
    })
  ));
};

runScript();