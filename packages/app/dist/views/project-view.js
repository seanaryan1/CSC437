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
var project_view_exports = {};
__export(project_view_exports, {
  ProjectView: () => ProjectView
});
module.exports = __toCommonJS(project_view_exports);
var import_lit = require("lit");
class ProjectView extends import_lit.LitElement {
  constructor() {
    super(...arguments);
    this.projectId = "";
    this.project = null;
    this.error = null;
  }
  static {
    /* ---------- reactive attributes ---------- */
    this.properties = {
      projectId: { type: String, attribute: "project-id" }
    };
  }
  static {
    this.styles = import_lit.css`
    :host { display:block; padding:1rem; max-width:60ch; margin:auto; }
    h1    { font-size:2rem; margin-bottom:.25rem; }
    h2    { margin-top:1.5rem; }
    li + li { margin-top:.25rem; }
    .error { color:red; }
  `;
  }
  connectedCallback() {
    super.connectedCallback();
    this.load();
  }
  updated(changed) {
    if (changed.has("projectId")) this.load();
  }
  async load() {
    this.project = null;
    this.error = null;
    if (!this.projectId) return;
    try {
      const res = await fetch(`/api/projects/${this.projectId}`);
      if (!res.ok) throw new Error(res.statusText);
      this.project = await res.json();
    } catch (err) {
      this.error = err.message;
    }
  }
  render() {
    if (this.error) return import_lit.html`<p class="error">⚠️ ${this.error}</p>`;
    if (!this.project) return import_lit.html`<p>Loading…</p>`;
    return import_lit.html`
      <header><h1>${this.project.title}</h1></header>

      <section>
        <h2>Overview</h2>
        <p>${this.project.overview}</p>
      </section>

      <section>
        <h2>Steps</h2>
        <ol>${this.project.steps.map((step) => import_lit.html`<li>${step}</li>`)}</ol>
      </section>

      <section>
        <h2>Materials</h2>
        <ul>${this.project.materials.map((m) => import_lit.html`<li>${m}</li>`)}</ul>
      </section>

      ${this.project.relatedPost ? import_lit.html`
            <section>
              <h2>Related Tutorial</h2>
              <a href="/app/post/${this.project.relatedPost}">
                Vintage Sewing Tutorial
              </a>
            </section>` : null}
    `;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ProjectView
});
