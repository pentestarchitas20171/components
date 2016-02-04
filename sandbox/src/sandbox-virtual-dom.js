import diff from 'virtual-dom/diff';
import patch from 'virtual-dom/patch';
import createElement from 'virtual-dom/create-element';
import virtualDomOptions from '../../src/util/virtual-dom';

import createApp from './App';
const App = createApp(virtualDomOptions);
let tree = App();

const rootNode = createElement(tree);
document.getElementById('app').appendChild(rootNode);

if(module.hot) {
  module.hot.accept('./App.js', () => {
    const createApp = require('./App').default;
    const App = createApp(virtualDomOptions);
    const newTree = App();

    const patches = diff(tree, newTree);
    patch(rootNode, patches);
    tree = newTree;
  });
}
