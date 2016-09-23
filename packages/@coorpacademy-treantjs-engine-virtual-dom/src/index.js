import isString from 'lodash/fp/isString';
import mapKeys from 'lodash/fp/mapKeys';
import pipe from 'lodash/fp/pipe';
import {walker, resolve, map} from '@coorpacademy/treantjs-core';
import h from 'virtual-dom/h';
import createElement from 'virtual-dom/create-element';
import diff from 'virtual-dom/diff';
import patch from 'virtual-dom/patch';
import toHtml from 'vdom-to-html';

const resolver = walker(resolve);

const eventPattern = /^on[A-Z].+/;

const transformProps = props => mapKeys(key => {
  if (eventPattern.test(key)) return key.toLowerCase();
  return key;
}, props);

const transform = vNode => {
  if (isString(vNode)) return vNode;
  const resolvedVNode = resolver(vNode);
  return h(
    resolvedVNode.tagName,
    transformProps(resolvedVNode.properties),
    map(transform, resolvedVNode.children)
  );
};

const render = el => {
  let rootNode = el.firstChild;
  let currentTree = el.firstChild;
  return vTree => {
    const transformedVTree = transform(vTree);

    if (!rootNode) {
      rootNode = createElement(transformedVTree, {
        document: global.document
      });
      el.appendChild(rootNode);
      currentTree = transformedVTree;
      return rootNode;
    }
    const patches = diff(currentTree, transformedVTree);
    rootNode = patch(rootNode, patches);
    currentTree = transformedVTree;
    return rootNode;
  };
};

const renderToString = pipe(
  transform,
  toHtml
);

export {
  transform,
  render,
  renderToString
};