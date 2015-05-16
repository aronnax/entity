
import {inheritance as inh} from 'aronnax-inheritance';

export var canvasRenderer = {
  name: 'renderer',
  BG_COLOR: '#000',

  render(entity) {
    this._ctx.fillStyle = this.BG_COLOR;
    this._ctx.fillRect(entity.x, entity.y, entity.w, entity.h);
  }
};

export function setupCanvasRenderer(ctxEl, opts={}) {
  var ctx = ctxEl.getContext('2d');

  ctxEl.style.width = (opts.ctxW || CTX_W) + 'px';
  ctxEl.style.height = (opts.ctxH || CTX_H) + 'px';

  let renderer = Object.create(canvasRenderer, inh.wrapProps({
    _ctx: ctx
  }));

  return ctx;
}
