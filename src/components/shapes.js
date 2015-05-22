
import {inheritance as inh} from 'aronnax-inheritance';

export var rectangular = {

  init(entity, props) {
    entity.w = props.w || 0;
    entity.h = props.h || 0;
  },

  render(entity) {
    entity.renderer.beforeRender(entity);
    entity.renderer.renderRectangle(entity);
  }
};

export var rounded = {
  name: 'rounded',

  init(entity, props) {
    entity.r = props.r || {tl: 0, tr: 0, bl: 0, br: 0};
  },

  render(entity) {
    entity.renderer.beforeRender(entity);
    entity.renderer.renderRounded(entity);
  }

};
