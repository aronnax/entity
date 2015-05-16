
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
  var ctxEl = document.createElement('canvas'),
      loop = Object.create(Looping);

  ctxEl.style.border = '1px solid black';
  document.querySelector('body').appendChild(ctxEl);

  let renderer = setupCanvasRenderer(ctxEl, {});

  let bounded = {
    name: 'bounded',

    update(entity) {
      if (entity.x < 0 || entity.x >= 400) {
        entity.v.x *= -1;
      }
      if (entity.y < 0 || entity.y >= 300) {
        entity.v.y *= -1;
      }
    }
  };

  let moved = {
    name: 'moved',

    update(entity) {
      entity.x += entity.v.x;
      entity.y += entity.v.y;
    }
  };

  let Ball = makeEntityProto({}, renderer, bounded, moved);

  let ball = Ball.make();
  ball.init({w: 6, h: 6, y: 20});
  ball.v.x = 2;
  ball.v.y = 2;

  loop.onConstantly(dt => {
    ball.update();
  });
  loop.onEveryFrame(dt => {
    ball.render();
    if (loop.frame >= 1000) {
      loop.stop();
    }
  });

  loop.start();

  t.end();
});

/*
test('basic setup for html renderer', t => {
  var ctxEl = document.createElement('div'),
      loop = Object.create(Looping);

  ctxEl.style.border = '1px solid black';
  document.querySelector('body').appendChild(ctxEl);

  let renderer = setupHTMLRenderer(ctxEl, {});

  let bounded = {
    name: 'bounded',

    update(entity) {
      if (entity.x < 0 || entity.x >= 400) {
        entity.v.x *= -1;
      }
      if (entity.y < 0 || entity.y >= 300) {
        entity.v.y *= -1;
      }
    }
  };

  let moved = {
    name: 'moved',

    update(entity) {
      entity.x += entity.v.x;
      entity.y += entity.v.y;
    }
  };

  let Ball = makeEntityProto({}, renderer, bounded, moved);

  let ball = Ball.make();
  ball.init({w: 6, h: 6, y: 20});
  ball.v.x = 2;
  ball.v.y = 2;

  loop.onConstantly(dt => {
    ball.update();
  });
  loop.onEveryFrame(dt => {
    ball.render();
    if (loop.frame >= 1000) {
      loop.stop();
    }
  });

  loop.start();

  t.end();
});
*/
