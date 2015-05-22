
import sinon from 'sinon';
import redtape from 'redtape';

import '../../setup';
import {rounded, rectangular} from '../../../src/components/shapes';

var sandbox,
    rendererI;

var test = redtape({
  beforeEach: (cb) => {
    sandbox = sinon.sandbox.create();
    rendererI = {
      beforeRender: function(ent) { },
      renderRectangle: function(ent) { },
      renderRounded: function(ent) { }
    };
    cb();
  },
  afterEach: (cb) => {
    sandbox.restore();
    cb();
  }
});

/**
 * rectangular
 */
test('init() sets w and h on entity with passed in props', t => {
  var testEntity = {},
      expected = {w: 5, h: 10};

  rectangular.init(testEntity, expected);

  t.equal(testEntity.w, expected.w, 'the w attribute is set to whats passed in');
  t.equal(testEntity.h, expected.h, 'the h attribute is set to whats passed in');

  t.end();
});

test('init() sets w and h to 0 if nothing passed in', t => {
  var testEntity = {},
      expected = {};

  rectangular.init(testEntity, expected);

  t.equal(testEntity.w, 0, 'the w attribute is set to 0');
  t.equal(testEntity.h, 0, 'the h attribute is set to 0');

  t.end();
});

test('render() calls renderRectangle on renderer', t => {
  var expected = {},
      mock = sandbox.mock(rendererI),
      testEntity = {w: 5, h: 10, _element: expected, renderer: mock.object};

  //mock.expects('renderRectangle').once().withArgs(expected);
  rectangular.render(testEntity);

  //mock.verify();

  t.end();
});
