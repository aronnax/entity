
import sinon from 'sinon';
import redtape from 'redtape';

import {inheritance} from 'aronnax-inheritance';
import {Looping} from 'aronnax-looping';

import './setup';
import {Entity, makeEntityProto, component} from '../src/entity';
//import {setupCanvasRenderer} from '../src/canvasRenderer';
import {setupHTMLRenderer} from '../src/html_renderer';


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

test('basic setup for html renderer', t => {
  var ctxEl = document.createElement('div'),
      eX = 10,
      eY = 10,
      eW = 5,
      eH = 10,
      TestE,
      rendrr,
      loop;

  // setup
  loop = Object.create(Looping);
  rendrr = setupHTMLRenderer(ctxEl);

  TestE = makeEntityProto({className: 'Test'},
      // TODO this call should potentially fail without a renderer.
      rendrr,
      component.rectangular,
      component.moveable);

  let teste = TestE.make();
  teste.init({x: eX, y: eY, w: eW, h: eH});

  // after init
  t.equal(teste.x, eX, 'x set to expected');
  t.equal(teste.w, eW, 'x set to expected');
  t.equal(teste.v.x, 0, 'moveable components sets velocity to 0 by default');
  t.ok(teste.renderer, 'renderer exists');
  let el = teste.renderer._element;
  t.ok(el, 'element exists on renderer');

  // after render
  teste.render();
  t.equal(el.style.width, eW + 'px', 'elements width is equal to passed in');

  // after update
  teste.v.x = 1;
  teste.update();
  t.equal(teste.x, eX + 1, 'x has velocity added');
  teste.update();
  t.equal(teste.x, eX + 2, 'x has velocity added again');

  // after render
  teste.x = eX;
  teste.render();
  t.equal(el.style.transform, 'translate(10px, 10px)',
      'el style transform starts at expected');
  teste.update();
  teste.render();
  t.equal(el.style.transform, 'translate(11px, 10px)',
      'el style transform adds x');

  loop.onEveryFrame(dt => {
    teste.update(dt);
  });
  loop.onConstantly(dt => {
    teste.render(dt);
  });


  // TODO, would be cool to init loop without actually starting.

  t.end();
});

