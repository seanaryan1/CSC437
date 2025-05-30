import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import reset from './styles/reset.css.ts';

export class ProjectElement extends LitElement {
  /* reflected attributes → class fields */
  @property({ attribute: 'img-src' }) imgSrc = '';
  @property() href = '#';
  @property() tags = '';                      /* comma-separated */
  
  override render() {
    const tagList = this.tags.split(',').map(t => t.trim()).filter(Boolean);
    return html`
      <article>
        <a class="thumb" href=${this.href}>
          <img loading="lazy" src=${this.imgSrc} alt="" />
        </a>

        <header>
          <h2><a href=${this.href}><slot></slot></a></h2>
        </header>

        ${tagList.length
          ? html`<ul class="tags">
              ${tagList.map(t => html`<li>${t}</li>`)}
            </ul>`
          : null}

        <p class="blurb"><slot name="blurb"></slot></p>
      </article>
    `;
  }

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
      h2 { font: var(--font-h3); margin: 0; }

      ul.tags {
        display: flex;
        gap: var(--space-xs);
        flex-wrap: wrap;
        padding: 0 var(--space-sm);
        margin: 0 0 var(--space-sm);
        list-style: none;
      }
      ul.tags li {
        background: var(--surface-muted);
        padding: 0 var(--space-xs);
        border-radius: var(--radius-xs);
        font: var(--font-xs);
      }
      .blurb { padding: 0 var(--space-sm) var(--space-sm); }
    `
  ];
}
