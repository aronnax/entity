import sinon from 'sinon';
import redtape from 'redtape';


import '../setup';
import helpers from '../helpers';
import {setupHTMLRenderer, htmlRenderer} from '../../src/html_renderer';

var sandbox,
    stubHTMLElement;

var test = redtape({
  beforeEach: (cb) => {
    var el = document.createElement('div');
    sandbox = sinon.sandbox.create();
    stubHTMLElement = el;
    cb();
  },
  afterEach: (cb) => {
    sandbox.restore();
    cb();
  }
});

test('exists', t => {
  t.ok(htmlRenderer, 'renderer exists');
  t.ok(setupHTMLRenderer, 'setup function exists');
  t.end();
});

/**
 * =============================================================================
 * init();
 * =============================================================================
 */
test('init() creates new element and sets it to element', t => {
  var rendrr = setupHTMLRenderer(document.createElement('div')),
      expected = stubHTMLElement,
      stub;

  stub = sandbox.stub(document, 'createElement', () => {
    return expected;
  });

  t.ok(!rendrr._element, 'element doesn\'t exist yet');

  rendrr.init({});

  t.equal(rendrr._element, expected, 'element set to stub html element');

  t.end();
});

test('init() sets element position to absolute', t => {
  var rendrr = setupHTMLRenderer(document.createElement('div')),
      expected = 'absolute';

  rendrr.init({});

  t.equal(rendrr._element.style.position, expected, 'sets style to absolute');

  t.end();
});

test('init() sets element background to bg color default on renderer', t => {
  var rendrr = setupHTMLRenderer(document.createElement('div')),
      expected = helpers.hexToRgb(rendrr.BG_COLOR).toString();

  rendrr.init({});

  t.equal(rendrr._element.style.background, expected,
      'sets background to default on renderer object');

  t.end();
});

test('init() appends the element to the ctx', t => {
  var rendrr = setupHTMLRenderer(document.createElement('div'));

  let mockDoc = sandbox.mock(document.createElement('div'));
  let stubCreate = sandbox.stub(document, 'createElement', () => {
    return stubHTMLElement;
  });
  rendrr._ctx = mockDoc.object;

  mockDoc.expects('appendChild').once().withArgs(stubHTMLElement);

  rendrr.init({});

  mockDoc.verify();

  t.end();
});

test('init() does nothing if element already exists', t => {
  var rendrr = setupHTMLRenderer(document.createElement('div'));

  let stubCreate = sandbox.stub(document, 'createElement');
  rendrr._element = stubHTMLElement;

  rendrr.init({});

  t.equal(stubCreate.callCount, 0, 'create stub not called');

  t.end();
});

/**
 * =============================================================================
 * beforeRender();
 * =============================================================================
 */
test('beforeRender() sets element background to default background', t => {
  var rendrr = setupHTMLRenderer(document.createElement('div')),
      expectedHex = '#FF0000',
      expected = helpers.hexToRgb(expectedHex).toString();

  rendrr.init({});
  rendrr.BG_COLOR = expectedHex;
  rendrr.beforeRender({});

  t.equal(rendrr._element.style.background, expected,
      'sets background to default on renderer object');

  t.end();
});
