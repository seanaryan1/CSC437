import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import reset from './styles/reset.css.ts';      // same trick you used before

export class PostElement extends LitElement {
  /* === reflected attributes === */
  @property({ attribute: 'img-src' }) imgSrc = '';
  @property() href = '#';
  @property() author = '';
  @property() date = '';

  /* === template === */
  override render() {
    return html`
      <article>
        <a class="thumb" href=${this.href}>
          <img loading="lazy" src=${this.imgSrc} alt="" />
        </a>

        <header>
          <h2><a href=${this.href}><slot></slot></a></h2>
          <p class="meta">${this.author} · <time>${this.date}</time></p>
        </header>

        <p class="summary"><slot name="summary"></slot></p>
      </article>
    `;
  }

  /* === scoped styles === */
  static styles = [
    reset.styles,
    css`
      :host {
        display: block;
        background: white;
        border-radius: var(--radius-sm);
        box-shadow: var(--shadow-sm);
        overflow: hidden;
      }
      img {
        width: 100%;
        aspect-ratio: 4/3;
        object-fit: cover;
        display: block;
      }
      header { padding: var(--space-sm); }
      .summary { padding: 0 var(--space-sm) var(--space-sm); }
      h2 { font: var(--font-h3); margin: 0; }
      .meta { font: var(--font-sm); color: var(--text-muted); }
    `
  ];
}
