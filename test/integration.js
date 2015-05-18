
import sinon from 'sinon';
import redtape from 'redtape';

import {inheritance} from 'aronnax-inheritance';
import {Looping} from 'aronnax-looping';

import './setup';
import {Entity, makeEntityProto} from '../src/entity';
import {setupCanvasRenderer} from '../src/canvasRenderer';
import {setupHTMLRenderer} from '../src/htmlRenderer';


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

test('basic setup for canvas renderer', t => {
  t.end();
});

