import test from 'ava';
import addClassName from '../add-class-name';
import {h} from '../../../../@treantjs/core';

test('should merge classNames', t => {
  const child = {
    properties: {
      className: 'foo'
    }
  };

  const className = addClassName('bar')(child);
  t.is(className, 'foo bar');
});

test('should init classNames', t => {
  const child = {};
  const className = addClassName('foo')(child);
  t.is(className, 'foo');
});

test('should add a className', t => {
  const node = <h1 className={'foo'}></h1>;
  const className = addClassName('bar')(node);
  t.is(className, 'foo bar');
});