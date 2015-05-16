
import {inheritance as inh} from 'aronnax-inheritance';

export var moveable = {
  name: 'moveable',

  init(entity) {
    entity.v = {x: 0, y: 9};
  },

  update(entity) {
    entity.x += entity.v.x;
    entity.y += entity.v.y;
  }
}

export var bounded = {
  name: 'bounded',

  update(entity) {
    if (entity.x < 0 || entity.x >= entity.renderer.bW) {
      entity.v.x *= -1;
    }
    if (entity.y < 0 || entity.y >= entity.renderer.bH) {
      entity.v.y *= -1;
    }
  }
};
