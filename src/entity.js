
import {inheritance as inh} from 'aronnax-inheritance';
import {Pooled} from 'aronnax-pooling';

import * as components from './components/components';
export {setupCanvasRenderer} from './canvas_renderer';
export {setupHTMLRenderer} from './html_renderer';


export var Entity = Object.create(Pooled, inh.wrapProps({
  className: 'entity',
  components: [],

  init(props={}) {
    this.x = props.x || 0;
    this.y = props.y || 0;
    this.w = props.w || 0;
    this.h = props.h || 0;
    this.initComponents(this, props);
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
  }
}));

export function makeEntityProto(props, ...components) {
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

  return proto;
};

export var component = components;
