
import {inheritance as inh} from 'aronnax-inheritance';

export var moveable = {
  name: 'moveable',

  init(entity) {
    entity.v = {x: 0, y: 0};
  },

  update(entity) {
    entity.x += entity.v.x;
    entity.y += entity.v.y;
  },

  render(entity) {
    entity.renderer.beforeRender(entity);
    entity.renderer.renderMovement(entity);
  }
}

export var bounded = {
  name: 'bounded',

  update(entity) {
    if (entity.x < 0 || entity.x >= (entity.renderer.bW - entity.w)) {
      entity.v.x *= -1;
    }
    if (entity.y < 0 || entity.y >= (entity.renderer.bH - entity.h)) {
      entity.v.y *= -1;
    }
  }
};

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
    entity.renderer.renderCircle(entity);
  }

};
