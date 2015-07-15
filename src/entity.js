
import ee2 from 'eventemitter2';
import SAT from 'sat';

import {inheritance as inh} from 'aronnax-inheritance';
import {Pooled} from 'aronnax-pooling';

import * as components from './components/components';
export {setupCanvasRenderer} from './canvas_renderer';
export {setupHTMLRenderer} from './html_renderer';

var EventEmitter = ee2.EventEmitter2;

export var Entity = {
  className: 'entity',
  components: [],

  get x() {
    var pos = this.pos || {};
    return pos.x;
  },

  get y() {
    var pos = this.pos || {};
    return pos.y;
  },

  set x(val) {
    var pos = this.pos || {};
    pos.x = val;
  },

  set y(val) {
    var pos = this.pos || {};
    pos.y = val;
  },

  init(props={}) {
    this.pos = new SAT.Vector(props.x, props.y);
    this.w = props.w || 0;
    this.h = props.h || 0;
    this.initComponents(this, props);
    // TODO pooling : constructor
    this._events = new EventEmitter({wildcard: true});
  },

  initComponents(entity, props) {
    for (let component of this.components) {
      component.init && component.init(entity, props);
    }
  },

  update(...props) {
    this.updateComponents(this, ...props);
  },

  updateComponents(entity, ...props) {
    for (let component of this.components) {
      component.update && component.update(entity, ...props);
    }
  },

  render() {
    this.renderComponents(this);
  },

  renderComponents(entity) {
    for (let component of this.components) {
      component.render && component.render(entity);
    }
  },

  /**
   * Publish an event with data.
   *
   * @param {String} event Name of event to publish.
   * @param {Object} data Data to send with the event.
   */
  emit(event, ...data) {
    this._events.emit(event, ...data);
  },

  /**
   * Subscribe to an event and call a callback.
   *
   * @param {String} event Name of event to publish.
   * @param {Function} listener Callback function to call when event is published.
   */
  on(events, listener) {
    return this._events.on(events, listener);
  },

  /**
   * Subscribe to any event being called on the entity.
   *
   * @param {Function} listener The callback function to call when any event is
   * published.
   */
  onAny(listener) {
    return this._events.onAny(listener);
  }
};

export function makeEntityProto(props={}, ...components) {
  Object.assign(props, {components: []});
  var proto = Object.create(Entity, inh.wrapProps(props));

  for (let component of components) {
    if (component) {
      proto.components.push(component);
      let componentName = component.name || component.className;
      if (componentName) {
        proto[componentName] = component;
      }
    }
  }

  proto.make = function() {
    return Object.create(proto);
  };

  return proto;
};

export var component = components;
