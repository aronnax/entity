
import {inheritance as inh} from 'aronnax-inheritance';

const CTX_W = 400,
      CTX_H = 300;

export var htmlRenderer = {
  name: 'renderer',
  BG_COLOR: '#000',

  init(entity) {
    if (!entity._element) {
      // TODO use pooling for elements.
      // TODO html renderer could use function to figure out what it should
      // be.
      entity._element = document.createElement('div');
      entity._element.style.position = 'absolute';
      entity._element.style.background = this.BG_COLOR;
      this._ctx.appendChild(entity._element);
    }
  },

  beforeRender(entity) {
    entity._element.style.background = entity.bg || this.BG_COLOR;
  },

  renderMovement(entity={}) {
    entity._element.style.transform = `translate(
        ${entity.x || 0}px,
        ${entity.y || 0}px)`;
  },

  renderRectangle(entity={}) {
    // TODO how to make bg only happen once (don't waste cycles)
    entity._element.style.width = Math.floor(entity.w || 0) + 'px';
    entity._element.style.height = Math.floor(entity.h || 0) + 'px';
  },

  renderRounded(entity={}) {
    var el = entity._element;

    entity._element.style.width = Math.floor(entity.r || 0) + 'px';
    entity._element.style.height = Math.floor(entity.r || 0) + 'px';
    entity._element.style.borderRadius = '50%';
  }
};

export function setupHTMLRenderer(ctxEl, opts={}) {
  if (!ctxEl) {
    throw new Error('context element is null');
  }
  ctxEl.style.position = 'relative';
  ctxEl.style.width = (opts.ctxW || CTX_W) + 'px';
  ctxEl.style.height = (opts.ctxH || CTX_H) + 'px';

  let renderer = Object.create(htmlRenderer, inh.wrapProps({
    _ctx: ctxEl,
    bW: (opts.ctxW || CTX_W),
    bH: (opts.ctxH || CTX_H)
  }));

  return renderer;
}
