import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { customElement } from 'lit/decorators.js';
import { define } from '@calpoly/mustang';
import { CommentElement } from './comment.ts';

@customElement('sc-comments-list')
export class CommentList extends LitElement {
  @property() src?: string;
  @state() private comments: Array<{
    user: string;
    date: string;
    pfp?: string;
    text: string;
  }> = [];

  connectedCallback() {
    super.connectedCallback();
    if (this.src) this.loadComments();
  }

  private async loadComments() {
    try {
      const res = await fetch(this.src!);
      if (!res.ok) throw new Error(res.statusText);
      this.comments = await res.json();
    } catch (e) {
      console.error('Failed to load comments:', e);
    }
  }

  render() {
    return html`
      ${this.comments.map(
        (c) => html`
          <sc-comment
            user=${c.user}
            date=${c.date}
            pfp=${c.pfp || ''}
          >
            ${c.text}
          </sc-comment>
        `
      )}
    `;
  }
}

define({
  'sc-comment': CommentElement,
  'sc-comments-list': CommentList,
});
