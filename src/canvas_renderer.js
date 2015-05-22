
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

  },

  renderRounded(entity) {
    var ctx = this._ctx;

    ctx.filleStyle = this.BG_COLOR;
    ctx.beginPath();
    ctx.moveTo(entity.x + entity.r.tl, entity.y);
    ctx.lineTo(entity.r.r - (entity.r.tr), entity.y);
    ctx.quadraticCurveTo(entity.r.r, entity.y, entity.r.r, entity.y + entity.r.tr);
    ctx.lineTo(entity.r.r, (entity.x + entity.h) - entity.r.br);
    ctx.quadraticCurveTo(entity.r.r, (entity.x + entity.h), entity.r.r- entity.r.br, (entity.x + entity.h));
    ctx.lineTo(entity.x + entity.r.bl, (entity.x + entity.h));
    ctx.quadraticCurveTo(entity.x, (entity.x + entity.h), entity.x, (entity.x + entity.h) - entity.r.bl);
    ctx.lineTo(entity.x, entity.y + entity.r.tl);
    ctx.quadraticCurveTo(entity.x, entity.y, entity.x + entity.r.tl, entity.y);
    ctx.fill();
    ctx.endPath();

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
