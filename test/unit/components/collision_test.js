
import sinon from 'sinon';
import redtape from 'redtape';

import '../../setup';
import {makeEntityProto, Entity} from '../../../src/entity';
import * as component from '../../../src/components/components';

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

var CircleProto = makeEntityProto({className: 'EP'},
    component.moveable,
    component.rounded,
    component.collision);

var BoxProto = makeEntityProto({className: 'BP'},
    component.moveable,
    component.rectangular,
    component.collision);

/**
 * =============================================================================
 * checkCollision()
 * =============================================================================
 */
test('checkCollision() will return an SAT response if there\' a collision ' +
    ' on two circles', t => {
  var testEntityA = CircleProto.make(),
      testEntityB = CircleProto.make(),
      actual;

  testEntityA.init({x: 10, y: 10, r: 10});
  testEntityB.init({x: 20, y: 20, r: 10});

  actual = component.collision.checkCollision(testEntityA, testEntityB);

  t.ok(actual, 'Collision is not false');
  t.equal(actual.a, testEntityA, 'Sets a collision object to first entity');

  t.end();
});

test('checkCollision() will return an SAT response if there\' a collision ' +
    ' on two boxes', t => {
  var testEntityA = BoxProto.make(),
      testEntityB = BoxProto.make(),
      actual;

  testEntityA.init({x: 10, y: 10, r: 10});
  testEntityB.init({x: 20, y: 20, r: 10});

  actual = component.collision.checkCollision(testEntityA, testEntityB);

  t.ok(actual, 'Collision is not false');
  // t.equal(actual.a, testEntityA, 'Sets a collision object to first entity');

  t.end();
});

test('checkCollision() will return an SAT response if there\' a collision ' +
    ' on circle and box', t => {
  var testEntityA = CircleProto.make(),
      testEntityB = BoxProto.make(),
      actual;

  testEntityA.init({x: 10, y: 10, r: 10});
  testEntityB.init({x: 20, y: 20, r: 10});

  actual = component.collision.checkCollision(testEntityA, testEntityB);

  t.ok(actual, 'Collision is not false');
  t.equal(actual.a, testEntityA, 'Sets a collision object to first entity');

  t.end();
});

test('checkCollision() will return false if no collision', t => {
  t.end();
});
