import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import reset from './styles/reset.css.ts';

@customElement('sc-post-view')
export class PostView extends LitElement {
  @state() post?: any;

  /* --- Fetch matching record once mounted --- */
  async connectedCallback() {
    super.connectedCallback();
    const params = new URLSearchParams(location.search);
    if (params.get('type') !== 'post') return;   // not my job
    const id = params.get('id');
    const res = await fetch('/data/posts.json');
    const list = res.ok ? await res.json() : [];
    this.post = list.find((p: any) => p.id === id);
  }

  render() {
    if (!this.post) return html`<p>Post not found.</p>`;
    const p = this.post;
    return html`
      <article>
        <h1>${p.title}</h1>
        <p class="meta">By ${p.author} · <time>${p.date}</time></p>
        <img src=${p.imgSrc} alt="" />
        <p class="summary">${p.summary}</p>
      </article>

      <section>
        <h2>Comments</h2>
        <sc-comments-list src="/data/comments.json"></sc-comments-list>
      </section>
    `;
  }

  static styles = [
    reset.styles,
    css`
      :host { display:block; padding:var(--space-lg); max-width:60ch; margin:auto; }
      img { width:100%; border-radius:var(--radius-sm); margin:var(--space-md) 0; }
      .meta { color:var(--text-muted); font:var(--font-sm); margin-bottom:var(--space-sm); }
    `
  ];
}
