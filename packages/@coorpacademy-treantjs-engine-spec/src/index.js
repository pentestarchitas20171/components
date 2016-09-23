import jsdom from 'jsdom';
import testRender from './render';
import testProperties from './properties';

const engineSpec = (test, engine) => {
  test.before(() => {
    global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
    global.window = document.defaultView;
  });
  testProperties(test, engine);
  testRender(test, engine);
};

export default engineSpec;