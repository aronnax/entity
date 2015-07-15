
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
  t.ok(teste.rectangular.toPolygon, 'sets SAT methods');
  t.equal(teste.x, eX, 'x set to expected');
  t.equal(teste.w, eW, 'x set to expected');
  t.equal(teste.v.x, 0, 'moveable components sets velocity to 0 by default');
  t.ok(teste.renderer, 'renderer exists');
  let el = teste._element;
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
  let actual = el.style.transform
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace(/\s+/g, '');
  t.equal(actual, 'translate(10px,10px)',
      'el style transform starts at expected');
  teste.update();
  teste.render();
  actual = el.style.transform
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace(/\s+/g, '');
  t.equal(actual, 'translate(11px,10px)',
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

test('testing two elements of same type', t => {
  var ctxEl = document.createElement('div');

  let loop = Object.create(Looping);
  let rendrr = setupHTMLRenderer(ctxEl);

  let TestE = makeEntityProto({className: 'Test'},
      // TODO this call should potentially fail without a renderer.
      rendrr,
      component.rectangular,
      component.moveable);

  let test1 = TestE.make();
  let test2 = TestE.make();
  test1.init({x: 0, y: 0, w: 5, h: 5});
  test2.init({x: 3, y: 3, w: 10, h: 10});

  t.equal(test1.x, 0, 'first entity x is 0');
  t.equal(test1.w, 5, 'first entity w is 5');
  t.equal(test2.y, 3, 'first entity y is 3');
  t.equal(test2.w, 10, 'second entity w is 10');

  test1.v.x = 1;
  test2.v.x = 2;
  test1.update();
  test2.update();
  t.equal(test1.x, 0 + 1, 'entity 1 set to x + velocity x');
  t.equal(test2.x, 3 + 2, 'entity 2 set to x + velocity x');

  test1.x = 0;
  test2.x = 3;
  test1.render();
  test2.render();
  let el1 = test1._element;
  let el2 = test2._element;
  let actual1 = el1.style.transform
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace(/\s+/g, '');
  let actual2 = el2.style.transform
    .replace(/(\r\n|\n|\r)/gm, '')
    .replace(/\s+/g, '');
  t.equal(actual1, 'translate(0px,0px)',
      'el 1 style transform set to current x and y');
  t.equal(actual2, 'translate(3px,3px)',
      'el 2 style transform set to current x and y');

  t.end();
});

test('eventing works', t => {
  var TestEntity = makeEntityProto({className: 'Squid'}),
      expected = {id: 1},
      spy = sandbox.spy();

  let testE = TestEntity.make();
  testE.init({});

  testE.on('testEvent', spy);

  testE.emit('testEvent', {id: 1});

  t.ok(spy.withArgs(expected).calledOnce, 'calls the listener once with ' +
      'expected args');

  t.end();
});
