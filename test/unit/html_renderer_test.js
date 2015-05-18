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

/**
 * =============================================================================
 * renderMovement();
 * =============================================================================
 */
test('renderMovement() sets elements transform to translate x and y', t => {
  var rendrr = setupHTMLRenderer(document.createElement('div')),
      expectedX = 3,
      expectedY = 5,
      testEntity = { x: expectedX, y: expectedY },
      expected = 'translate(' + expectedX + 'px, ' + expectedY + 'px)';

  rendrr.init({});
  rendrr.renderMovement(testEntity);

  let actual = rendrr._element.style.transform
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace(/\s+/g, '');

  expected = expected
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace(/\s+/g, '');

  t.equal(actual, expected, 'transform equals to translate ' +
      'x and y');

  t.end();
});

test('renderMovement() sets elements transform to 0 by default', t => {
  var rendrr = setupHTMLRenderer(document.createElement('div')),
      expected = 'translate(' + 0 + 'px, ' + 0 + 'px)';

  rendrr.init({});
  rendrr.renderMovement({});

  let actual = rendrr._element.style.transform
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace(/\s+/g, '');

  expected = expected
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace(/\s+/g, '');

  t.equal(actual, expected, 'transform equals to translate 0');

  t.end();
});

/**
 * =============================================================================
 * renderRectangle();
 * =============================================================================
 */
test('renderRectangle() sets elements width and height to entity props', t => {
  var rendrr = setupHTMLRenderer(document.createElement('div')),
      expectedW = 15,
      expectedH = 10,
      testEntity = { w: expectedW, h: expectedH };

  rendrr.init({});
  rendrr.renderRectangle(testEntity);

  t.equal(rendrr._element.style.width, expectedW + 'px', 'sets width to expected');
  t.equal(rendrr._element.style.height, expectedH + 'px', 'sets height to expected');

  t.end();
});

test('renderRectangle() sets elements width and height to 0 by default', t => {
  var rendrr = setupHTMLRenderer(document.createElement('div'));

  rendrr.init({});
  rendrr.renderRectangle();

  t.equal(rendrr._element.style.width, 0 + 'px', 'sets width to 0');
  t.equal(rendrr._element.style.height, 0 + 'px', 'sets height to 0');

  t.end();
});
/**
 * =============================================================================
 * renderCircle();
 * =============================================================================
 */
test('renderCircle() sets elements border radius elements', t => {
  var rendrr = setupHTMLRenderer(document.createElement('div')),
      expectedTL = 15,
      expectedTR = 10,
      expectedBL = 5,
      expectedBR = 20,
      testEntity = {}

  testEntity.r = {
    tr: expectedTR,
    tl: expectedTL,
    bl: expectedBL,
    br: expectedBR
  };

  rendrr.init({});
  rendrr.renderCircle(testEntity);

  t.equal(rendrr._element.style.borderRadiusTopRight, expectedTR + 'px',
      'sets top right to expected');
  t.equal(rendrr._element.style.borderRadiusTopLeft, expectedTL + 'px',
      'sets top left to expected');
  t.equal(rendrr._element.style.borderRadiusBottomRight, expectedBR + 'px',
      'sets bottom right to expected');
  t.equal(rendrr._element.style.borderRadiusBottomLeft, expectedBL + 'px',
      'sets bottom left to expected');

  t.end();
});

test('renderCircle() sets elements border radius to 0 by default', t => {
  var rendrr = setupHTMLRenderer(document.createElement('div'));

  rendrr.init({});
  rendrr.renderCircle();

  t.equal(rendrr._element.style.borderRadiusTopRight, 0 + 'px',
      'sets top right to 0');
  t.equal(rendrr._element.style.borderRadiusTopLeft, 0 + 'px',
      'sets top left to 0');
  t.equal(rendrr._element.style.borderRadiusBottomRight, 0 + 'px',
      'sets bottom right to 0');
  t.equal(rendrr._element.style.borderRadiusBottomLeft, 0 + 'px',
      'sets bottom left to 0');

  t.end();
});
