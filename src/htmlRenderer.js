
import {inheritance as inh} from 'aronnax-inheritance';

const CTX_W = 400,
      CTX_H = 300;

export var htmlRenderer = {
  name: 'renderer',
  BG_COLOR: '#000',

  render(entity) {
    if (!this._element) {
      // TODO use pooling for elements.
      // TODO html renderer could use function to figure out what it should
      // be.
      this._element = document.createElement('div');
      this._element.style.position = 'absolute';
      this._element.style.background = this.BG_COLOR;
      this._ctx.appendChild(this._element);
    }
    this._element.style.width = Math.floor(entity.w || 0) + 'px';
    this._element.style.height = Math.floor(entity.h || 0) + 'px';
    this._element.style.transform = `translate(
        ${entity.x || 0}px,
        ${entity.y || 0}px)`;

  }
};

export function setupHTMLRenderer(ctxEl, opts={}) {
  ctxEl.style.position = 'relative';
  ctxEl.style.width = (opts.ctxW || CTX_W) + 'px';
  ctxEl.style.height = (opts.ctxH || CTX_H) + 'px';

  let renderer = Object.create(htmlRenderer, inh.wrapProps({
    _ctx: ctxEl
  }));

  return renderer;
}
