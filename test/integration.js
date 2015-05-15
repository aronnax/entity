
import sinon from 'sinon';
import redtape from 'redtape';

import './setup';
import {Entity} from '../src/entity';
import {inheritance} from 'aronnax-inheritance';

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

test('exists', t => {
  t.ok(Entity);
  t.end();
});

test('basic interface', t => {
  var Ball = Object.create(Entity, inheritance.wrapProps({
    radius: 5
  });

  let htmlRenderer = {
    name: 'htmlRenderer'
  };

  var Ball = Entityer(
    [bounded, htmlRenderer],
    [is2d, isDraggable],
    {
      radius: 5,
      update() {
        this.bounded.doSomething();
      },
      render() {

      }
    });

  t.end();
});
