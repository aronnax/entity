
import sinon from 'sinon';
import redtape from 'redtape';

import {inheritance as inh} from 'aronnax-inheritance';

import '../setup';
import {Entity, makeEntityProto} from '../../src/entity';

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

/**
 * =============================================================================
 * init();
 * =============================================================================
 */
test('init() setups x, y, w and h to 0', t => {
  var TestEntity = makeEntityProto({}),
      actual;

  actual = TestEntity.make();
  actual.init();

  t.equal(actual.x, 0, 'Sets x to 0');
  t.equal(actual.y, 0, 'Sets y to 0');
  t.equal(actual.w, 0, 'Sets w to 0');
  t.equal(actual.h, 0, 'Sets h to 0');

  t.end();
});

test('init() calls init on all components', t => {
  var spy = sandbox.spy(),
      testComponent = {
        name: 'testComp',
        init: spy
      };

  let TestEntity = makeEntityProto({className: 'TestEntity'}, testComponent);

  let actual = TestEntity.make();
  actual.init();

  t.equal(spy.callCount, 1, 'component init command called once');

  t.end();
});

test('init() passes props through to inits', t => {
  var spy = sandbox.spy(),
      testComponent = {
        name: 'testCompA',
        init: spy
      },
      expected = {v: 1};

  let TestEntity = makeEntityProto({className: 'TestEntityA'}, testComponent);
  let actual = TestEntity.make();
  actual.init(expected);

  t.equal(spy.callCount, 1, 'component init command called once');
  t.ok(spy.calledWith(actual, expected), 'spy was called with expected arg');

  t.end();
});

/*
 * =============================================================================
 * update();
 * =============================================================================
 */
test('update() calls update on each component that has an update()', t => {
  var spyA = sandbox.spy(),
      spyB = sandbox.spy(),
      compA = { update: spyA },
      compB = { update: spyB },
      testEntity = Object.create(Entity, inh.wrapProps({
        components: []
      }));

  testEntity.components.push(compA);
  testEntity.components.push(compB);

  t.ok(!spyA.called, 'update A not called yet');
  t.ok(!spyB.called, 'update B not called yet');
  testEntity.update();

  t.equal(spyA.callCount, 1, 'update A called once');
  t.equal(spyB.callCount, 1, 'update B called once');

  t.end();
});

/*
 * =============================================================================
 * render();
 * =============================================================================
 */
test('render() calls render on each component that has an render()', t => {
  var spyA = sandbox.spy(),
      spyB = sandbox.spy(),
      compA = { render: spyA },
      compB = { render: spyB },
      testEntity = Object.create(Entity, inh.wrapProps({
        components: []
      }));

  testEntity.components.push(compA);
  testEntity.components.push(compB);

  t.ok(!spyA.called, 'render A not called yet');
  t.ok(!spyB.called, 'render B not called yet');
  testEntity.render();

  t.equal(spyA.callCount, 1, 'render A called once');
  t.equal(spyB.callCount, 1, 'render B called once');

  t.end();
});

test('render() passes entity to each component render method', t => {
  var spy = sandbox.spy(),
      component = { name: 'compA', render: spy },
      TestEntity = makeEntityProto({className: 'testProtoB'}, component);

  let testEntity = TestEntity.make();
  testEntity.init();
  testEntity.render();

  t.ok(spy.called, 'the spy was called');
  t.ok(spy.calledWith(testEntity), 'passes the actual entity as first arg');

  t.end();
});

/**
 * makeEntityProto()
 */
test('makeEntityProto() extends from Entity with props', t => {
  var testProps = {};

  testProps.propA = 'propertyA';
  testProps.methB = () => { return this.propA; };

  let Actual = makeEntityProto(testProps);

  t.equal(Actual.propA, testProps.propA, 'property A is defined');
  t.equal(Actual.methB, testProps.methB, 'method B is defined');
  t.ok(Actual.update, 'update is defined from Entity proto');
  t.ok(Actual.render, 'render is defined from Entity proto');

  t.end();
});

test('makeEntityProto() adds each component to the component property', t => {
  var expectedA = {},
      expectedB = {};

  expectedA = {
    test() { return; }
  };
  expectedB = {
    thing: 1
  };

  let Actual = makeEntityProto({}, expectedA, expectedB);

  t.equal(Actual.components[0], expectedA, 'first component is first component ' +
      'passed in');
  t.equal(Actual.components[1], expectedB, 'second component is second component ' +
      'passed in');

  t.end();
});

test('makeEntityProto() adds each named component directly', t => {
  var expected = {
    name: 'expected',
    thing: 1,
    thingM() {
      return this.thing;
    }
  };

  let Actual = makeEntityProto({}, expected);

  t.equal(Actual.expected, expected, 'directly adds the component if its named');

  expected.name = null;
  expected.className = 'expected';

  Actual = makeEntityProto({}, expected);

  t.equal(Actual.expected, expected, 'directly adds the component if its named ' +
      'className');

  t.end();
});

test('makeEntityProto() creating an instance works', t => {
  var spy = sandbox.spy(),
      expected = {
        name: 'expected',
        m: spy
      };

  let TestProto = makeEntityProto({className: 'newEntity'}, expected);
  let actual = TestProto.make();
  t.equal(actual.components[0], expected, 'expected component in components');
  t.equal(actual.expected, expected, 'adds named component directly as name');

  t.end();
});
