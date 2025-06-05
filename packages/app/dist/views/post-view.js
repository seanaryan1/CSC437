"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var post_view_exports = {};
__export(post_view_exports, {
  PostView: () => PostView
});
module.exports = __toCommonJS(post_view_exports);
var import_lit = require("lit");
class PostView extends import_lit.LitElement {
  constructor() {
    super(...arguments);
    /* ---------- internal state ---------- */
    this.postId = "";
    this.post = null;
    this.error = null;
  }
  static {
    /* ---------- reactive attributes (no decorators) ---------- */
    this.properties = {
      postId: { type: String, attribute: "post-id" }
    };
  }
  static {
    /* ---------- styles ---------- */
    this.styles = import_lit.css`
    :host { display:block; padding:1rem; max-width:60ch; margin:auto; }
    h1    { font-size:2rem; margin-bottom:.25rem; }
    .meta { color:var(--muted-500, #666); margin-bottom:1.5rem; }
    .error { color:red; }
    section + section { margin-top:2rem; }
  `;
  }
  /* ---------- lifecycle ---------- */
  connectedCallback() {
    super.connectedCallback();
    this.load();
  }
  updated(changed) {
    if (changed.has("postId")) this.load();
  }
  /* ---------- data loader ---------- */
  async load() {
    this.post = null;
    this.error = null;
    if (!this.postId) return;
    try {
      const res = await fetch(`/api/posts/${this.postId}`);
      if (!res.ok) throw new Error(res.statusText);
      this.post = await res.json();
    } catch (err) {
      this.error = err.message;
    }
  }
  /* ---------- render ---------- */
  render() {
    if (this.error) return import_lit.html`<p class="error">⚠️ ${this.error}</p>`;
    if (!this.post) return import_lit.html`<p>Loading…</p>`;
    return import_lit.html`
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PostView
});
