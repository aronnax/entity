
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
 * checkCollision()
 * =============================================================================
 */
test('checkCollision() will return false if no collision', t => {

  t.end();
});

test('checkCollision() will return an SAT response if there\' a collision', t => {

  t.end();
});
