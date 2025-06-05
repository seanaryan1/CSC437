import { LitElement, html, css } from "lit";

interface Post {
  id:        string;
  title:     string;
  body:      string;
  author:    string;
  createdAt: string;
}

export class PostView extends LitElement {
  /* ---------- reactive attributes (no decorators) ---------- */
  static properties = {
    postId: { type: String, attribute: "post-id" }
  };

  /* ---------- internal state ---------- */
  postId = "";
  private post:  Post   | null = null;
  private error: string | null = null;

  /* ---------- styles ---------- */
  static styles = css`
    :host { display:block; padding:1rem; max-width:60ch; margin:auto; }
    h1    { font-size:2rem; margin-bottom:.25rem; }
    .meta { color:var(--muted-500, #666); margin-bottom:1.5rem; }
    .error { color:red; }
    section + section { margin-top:2rem; }
  `;

  /* ---------- lifecycle ---------- */
  connectedCallback() {
    super.connectedCallback();
    this.load();
  }
  updated(changed: Map<string, unknown>) {
    if (changed.has("postId")) this.load();
  }

  /* ---------- data loader ---------- */
  private async load() {
    this.post = null;
    this.error = null;
    if (!this.postId) return;            // nothing to fetch yet

    try {
      const res = await fetch(`/api/posts/${this.postId}`);
      if (!res.ok) throw new Error(res.statusText);
      this.post = await res.json();
    } catch (err) {
      this.error = (err as Error).message;
    }
  }

  /* ---------- render ---------- */
  render() {
    if (this.error) return html`<p class="error">⚠️ ${this.error}</p>`;
    if (!this.post) return html`<p>Loading…</p>`;

    return html`
      <article>
        <h1>${this.post.title}</h1>
        <p class="meta">
          by ${this.post.author} —
          ${new Date(this.post.createdAt).toLocaleDateString()}
        </p>
        <section>${this.post.body}</section>
      </article>

      <section>
        <h2>Comments</h2>
        <sc-comments-list src="/api/posts/${this.post.id}/comments"></sc-comments-list>
      </section>
    `;
  }
}
