import { LitElement, html, css } from 'lit'
import { property } from 'lit/decorators.js';
import reset from "./styles/styles/scripts/styles/reset.css.ts";


export class CommentElement extends LitElement {
  @property() user = ''
  @property() date = ''
  @property({ attribute: 'pfp' }) pfp?: string

  static styles = [
    reset.styles,
    css`
    /* give the whole component a bit of spacing from whatever's around it */
    :host {
      display: block;
      margin-bottom: var(--space-lg);
    }

    /* style the inner container */
    article {
      padding: var(--space-md);
      background-color: white;
      border: 1px solid #ddd;
      border-radius: var(--radius-sm);
      /* optional subtle shadow for lift */
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    /* (rest of your existing styles) */
    .header {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
    }
    img.avatar {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      object-fit: cover;
    }
    .header h2 {
      margin: 0;
      font-size: var(--font-size-h2);
    }
    .header time {
      margin-left: auto;
      font-size: var(--font-size-sm);
      color: #666;
    }
    .body {
      margin-top: var(--space-sm);
    }
  `];

  override render() {
    return html`
      <article>
        <div class="header">
          ${this.pfp
            ? html`<img class="avatar" src=${this.pfp} alt="Avatar of ${this.user}">`
            : ''}
          <h2>${this.user}</h2>
          <time>${this.date}</time>
        </div>
        <div class="body">
          <slot></slot>
        </div>
      </article>
    `
  }
}
