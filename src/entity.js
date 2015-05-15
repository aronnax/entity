
import {inheritance as inh} from 'aronnax-inheritance';
import {Pooled} from 'aronnax-pooling';

export var Entity = Object.create(Pooled, inh.wrapProps({
  components: [],

  update() {
    for (let component of this.components) {
      component.update && component.update(this);
    }
  },

  render() {
    for (let component of this.components) {
      component.render && component.render(this);
    }
  }
}));

export function makeEntityProto(props, ...components) {
  Object.assign(props, {components: [] });
  var proto = Object.create(Entity, inh.wrapProps(props));

  for (let component of components) {
    proto.components.push(component);
    let componentName = component.name || component.className;
    if (componentName) {
      proto[componentName] = component;
    }
  }

  return proto;
};

