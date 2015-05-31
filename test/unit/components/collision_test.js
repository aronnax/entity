
import sinon from 'sinon';
import redtape from 'redtape';

import '../../setup';
import {collision} from '../../../src/components/collision';

var sandbox;

var test = redtape({
  beforeEach: (cb) => {
    sandbox = sinon.sandbox.create();
    cb();
  },
  afterEach: (cb) => {
    sandbox.restore();
    cb();
  }
});

test('rectangularIntersects() returns false if no intersection', t => {
  var entityA,
      entityB,
      actual;

  entityA = {x: 10, y: 10, w: 20, h: 20};
  entityB = {x: 40, y: 40, w: 10, h: 10};

  actual = collision.rectangularIntersects(entityA, entityB);

  t.ok(!actual, 'returns false');

  t.end();
});

test('rectangularIntersects() returns coordinates if intersection', t => {
  var entityA,
      entityB,
      actual;

  entityA = {x: 10, y: 10, w: 20, h: 20};
  entityB = {x: 20, y: 20, w: 10, h: 10};

  actual = collision.rectangularIntersects(entityA, entityB);

  t.ok(actual, 'returns truthy');
  t.equal(actual.w, 10, 'returns width of interesction');
  t.equal(actual.h, 10, 'returns height of intersection');
  t.equal(actual.x, 20, 'returns x of interesction');
  t.equal(actual.y, 20, 'returns y of intersection');

  entityA = {x: 10, y: 20, w: 30, h: 20};
  entityB = {x: 20, y: 30, w: 20, h: 20};
  actual = collision.rectangularIntersects(entityA, entityB);

  t.ok(actual, 'returns truthy');
  t.equal(actual.w, 20, 'returns width of interesction');
  t.equal(actual.h, 10, 'returns height of intersection');
  t.equal(actual.x, 20, 'returns x of interesction');
  t.equal(actual.y, 30, 'returns y of intersection');

  t.end();
});
