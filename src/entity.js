
import {inheritance as inh} from 'aronnax-inheritance';
import {Pooled} from 'aronnax-pooling';

export var Entity = Object.create(Pooled, inh.wrapProps({
  components: [],

  init(props) {
    this.x = props.x || 0;
    this.y = props.y || 0;
    this.w = props.w || 0;
    this.h = props.h || 0;
    this.v = {x: 0, y: 0};
  },

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
  Object.assign(props, {components: [], x: 0, y: 0, w: 0, h: 0 });
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

