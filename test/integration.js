
import sinon from 'sinon';
import redtape from 'redtape';

import {inheritance} from 'aronnax-inheritance';
import {Looping} from 'aronnax-looping';

import './setup';
import {Entity, makeEntityProto} from '../src/entity';



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
  var ctxEl = document.createElement('div'),
      loop = Object.create(Looping);

  ctxEl.style.position = 'relative';
  ctxEl.style.width = '400px';
  ctxEl.style.height = '300px';
  document.querySelector('body').appendChild(ctxEl);

  var htmlRenderer = {
    name: 'renderer',
    BG_COLOR: '#000',
    _element: null,
    _ctx: null,

    render(entity) {
      var exists = !!this._element;
      if (!exists) {
        // TODO use pooling for elements.
        // TODO html renderer could use function to figure out what it should
        // be.
        this._element = document.createElement('div');
        this._element.style.position = 'absolute';
        this._element.style.background = this.BG_COLOR;
        this._ctx.appendChild(this._element);
      }
      this._element.style.width = Math.floor(entity.w || 0) + 'px';
      this._element.style.height = Math.floor(entity.h || 0) + 'px';
      this._element.style.transform = `translate(
          ${entity.x || 0}px,
          ${entity.y || 0}px)`;

    }
  };
  htmlRenderer._ctx = ctxEl;

  let Ball = makeEntityProto({

    init(props) {
      this.x = props.x || 0;
      this.y = props.y || 0;
      this.w = props.w || 0;
      this.h = props.h || 0;
      this.v = {x: 0, y: 0};
    },

    update() {
      this.x += this.v.x;
      this.y += this.v.y;
    }
  }, htmlRenderer);

  let ball = Ball.make();
  ball.x = 10;
  // TODO fix, this changes the proto
  ball.v.x = 1;

  loop.onConstantly(dt => {
    ball.update();
    //console.log('update', ball.x, ball.y);
  });
  loop.onEveryFrame(dt => {
    ball.render();
  });

  loop.start();

  t.end();
});
