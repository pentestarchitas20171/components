import isFunction from 'lodash/fp/isFunction';
import isString from 'lodash/fp/isString';
import _map from 'lodash/fp/map';
import omit from 'lodash/fp/omit';
import flatten from 'lodash/fp/flatten';
import assign from 'lodash/fp/assign';
import compact from 'lodash/fp/compact';
import defaultsDeep from 'lodash/fp/defaultsDeep';
import partial from 'lodash/fp/partial';
import React, { createElement } from 'react';
import { render as _render, findDOMNode } from 'react-dom';

const omitChildren = omit(['children']);

const h = (tag, props, ...children) => {
  const _props = omitChildren(props);
  let _children = compact(flatten(props && props.children || children || []));
  _children = _children.length > 0 ? _children : undefined;

  return createElement(
    tag,
    _props,
    _children
  );
};

const clone = (child, properties, children) => {
  return createElement(
    child.type,
    defaultsDeep(child.props, properties),
    children || child.props.children || []
  );
};

const map = (fun, children) => {
  return _map(fun)(React.Children.toArray(children));
};

const resolve = vTree => {
  if (isFunction(vTree.type)) return resolve(vTree.type(vTree.props));
  return vTree;
};

const walker = (fun, vTree) => {
  vTree = isString(vTree) ? vTree : fun(vTree);
  if (!vTree.props || !vTree.props.children) return vTree;
  return clone(vTree, null, map(partial(walker, [fun]), vTree.props.children || []));
};

const render = el => {
  return vTree => {
    _render(vTree, el);
  };
};

const widget = options => {
  options = assign({
    tagName: 'div',
    init: () => {},
    update: () => {},
    destroy: () => {}
  }, options);

  return React.createClass({
    componentDidMount: function() {
      const el = findDOMNode(this);
      options.init(this.props, el);
    },

    componentDidUpdate: function(prev) {
      const el = findDOMNode(this);
      options.update(this.props, prev, el);
    },

    componentWillUnmount: function() {
      const el = findDOMNode(this);
      options.destroy(el);
    },

    render: function() {
      return React.createElement(options.tagName);
    }
  });
};


export default {
  h,
  map,
  clone,
  resolve,
  walker,
  render,
  widget
};