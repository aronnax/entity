
import {inheritance as inh} from 'aronnax-inheritance';

const CTX_W = 400,
      CTX_H = 300;

export var canvasRenderer = {
  name: 'renderer',
  BG_COLOR: '#000',

  render(entity) {
    this._ctx.clearRect(0, 0, this.bW, this.bH);

    this._ctx.fillStyle = this.BG_COLOR;

    this._ctx.fillRect(entity.x, entity.y, entity.w, entity.h);

  }
};

export function setupCanvasRenderer(ctxEl, opts={}) {
  if (!ctxEl) {
    throw new Error('context element (ctxEl) passed in was null');
  }
  var ctx = ctxEl.getContext('2d');

  ctxEl.style.width = (opts.ctxW || CTX_W) + 'px';
  ctxEl.style.height = (opts.ctxH || CTX_H) + 'px';
  ctxEl.setAttribute('width', (opts.ctxW || CTX_W));
  ctxEl.setAttribute('height', (opts.ctxH || CTX_H));

  let renderer = Object.create(canvasRenderer, inh.wrapProps({
    _ctx: ctx,
    bW: (opts.ctxW || CTX_W),
    bH: (opts.ctxH || CTX_H)
  }));

  return renderer;
}
