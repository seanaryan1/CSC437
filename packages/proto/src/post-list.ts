import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import { define } from '@calpoly/mustang';
import { PostElement } from './post.ts';

export class PostList extends LitElement {
  @property() src?: string;
  @state() posts: Array<any> = [];

  connectedCallback() { super.connectedCallback(); if (this.src) this.load(); }

  private async load() {
    const res = await fetch(this.src!);
    this.posts = res.ok ? await res.json() : [];
  }

  render() {
    return html`
      <div class="grid">
        ${this.posts.map(p => html`
          <sc-post
            img-src=${p.imgSrc}
            href=${`/viewer.html?type=post&id=${p.id}`}
            author=${p.author}
            date=${p.date}
          >
            ${p.title}
            <span slot="summary">${p.summary}</span>
          </sc-post>
        `)}
      </div>
    `;
  }

  static styles = css`
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
      gap: var(--space-lg);
    }
  `;
}

define({
    'sc-post': PostElement,      
    'sc-post-list': PostList
  });
  
