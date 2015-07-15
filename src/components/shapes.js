
import {inheritance as inh} from 'aronnax-inheritance';
import SAT from 'sat';


export var rectangular = Object.create(SAT.Box.prototype, inh.wrapProps({
  name: 'rectangular',
  isRectangular: true,

  init(entity, props) {
    entity.w = props.w || 0;
    entity.h = props.h || 0;
    entity.isRectangular = true;
  },

  render(entity) {
    entity.renderer.beforeRender(entity);
    entity.renderer.renderRectangle(entity);
  }
}));

export var rounded = Object.create(SAT.Circle, inh.wrapProps({
  name: 'rounded',
  isRounded: true,

  init(entity, props) {
    entity.r = props.r || 0;
    entity.isRounded = true;
  },

  render(entity) {
    entity.renderer.beforeRender(entity);
    entity.renderer.renderRounded(entity);
  }
}));

export var polygoned = Object.create(SAT.Polygon, inh.wrapProps({
  name: 'polygoned',
  isPolygoned: true,

  init(entity, props) {
    entity.points = props.point;
  },

  render(entity) {

  }
}));
