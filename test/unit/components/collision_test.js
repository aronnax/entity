
import sinon from 'sinon';
import redtape from 'redtape';

import '../../setup';
import {makeEntityProto, Entity} from '../../../src/entity';
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

/**
 * =============================================================================
 * update()
 * =============================================================================
 */
test('update() will not call a collision event if there are no other entities',
    t => {
  var TestE = makeEntityProto(),
      spy = sandbox.spy(),
      localCollision = Object.create(collision),
      testE = TestE.make();

  testE.init({x: 10, y: 10, w: 10, h: 10});
  testE.on('collision', spy);
  localCollision.init(testE);
  localCollision.update(testE);

  t.ok(!spy.called, 'the collision listener was not called');

  t.end();
});

test('update() will call a collision event if theres two intersecting entities',
    t => {
  var TestE = makeEntityProto(),
      spy = sandbox.spy(),
      localCollision = Object.create(collision),
      test1 = TestE.make(),
      test2 = TestE.make();

  test1.init({x: 10, y: 10, w: 20, h: 20});
  test2.init({x: 15, y: 15, w: 10, h: 20});
  test1.on('collision', spy);
  localCollision.init(test1);
  localCollision.init(test2);
  localCollision.update(test1);

  let collided = collision.rectangularIntersects(test1, test2);
  t.ok(collided, 'theres an intersection between two entities');

  t.ok(spy.calledOnce, 'the collision listener was called once');
  t.equal(spy.args[0][0].area, 150, 'passes the area to the listener');
  t.equal(spy.args[0][0].entityA, test1, 'passes the first entity to listener');
  t.equal(spy.args[0][0].entityB, test2, 'passes the 2nd entity to listener');
  t.equal(spy.args[0][0].type, 'rectangular', 'type is rectangular');

  t.end();
});

test('update() will call many collision events',
    t => {
  var TestE = makeEntityProto(),
      spy = sandbox.spy(),
      localCollision = Object.create(collision),
      test1 = TestE.make(),
      test2 = TestE.make(),
      test3 = TestE.make();

  test1.init({x: 10, y: 10, w: 20, h: 20});
  test2.init({x: 15, y: 15, w: 10, h: 20});
  test3.init({x: 5, y: 5, w: 10, h: 10});
  test1.on('collision', spy);
  localCollision.init(test1);
  localCollision.init(test2);
  localCollision.init(test3);
  localCollision.update(test1);

  let collided = collision.rectangularIntersects(test1, test2);
  t.ok(collided, 'theres an intersection between two entities');
  collided = collision.rectangularIntersects(test1, test3);
  t.ok(collided, 'theres an intersection between other two entities');

  t.equal(spy.callCount, 2, 'collision listener was called thrice');
  t.equal(spy.args[0][0].entityA, test1, 'passes the first entity to listener');
  t.equal(spy.args[0][0].entityB, test2, 'passes the 2nd entity to listener');
  t.equal(spy.args[1][0].entityA, test1, 'passes the first entity to listener');
  t.equal(spy.args[1][0].entityB, test3, 'passes the 3rd entity to listener');

  t.end();
});

/**
 * =============================================================================
 * rectangularIntersects()
 * =============================================================================
 */
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

