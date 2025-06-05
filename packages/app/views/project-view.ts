import { LitElement, html, css } from "lit";

interface Project {
  id:          string;
  title:       string;
  overview:    string;
  steps:       string[];
  materials:   string[];
  relatedPost: string | null;
}

export class ProjectView extends LitElement {
  /* ---------- reactive attributes ---------- */
  static properties = {
    projectId: { type: String, attribute: "project-id" }
  };

  projectId = "";
  private project: Project | null = null;
  private error:   string  | null = null;

  static styles = css`
    :host { display:block; padding:1rem; max-width:60ch; margin:auto; }
    h1    { font-size:2rem; margin-bottom:.25rem; }
    h2    { margin-top:1.5rem; }
    li + li { margin-top:.25rem; }
    .error { color:red; }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.load();
  }
  updated(changed: Map<string, unknown>) {
    if (changed.has("projectId")) this.load();
  }

  private async load() {
    this.project = null;
    this.error = null;
    if (!this.projectId) return;

    try {
      const res = await fetch(`/api/projects/${this.projectId}`);
      if (!res.ok) throw new Error(res.statusText);
      this.project = await res.json();
    } catch (err) {
      this.error = (err as Error).message;
    }
  }

  render() {
    if (this.error) return html`<p class="error">⚠️ ${this.error}</p>`;
    if (!this.project) return html`<p>Loading…</p>`;

    return html`
      <header><h1>${this.project.title}</h1></header>

      <section>
        <h2>Overview</h2>
        <p>${this.project.overview}</p>
      </section>

      <section>
        <h2>Steps</h2>
        <ol>${this.project.steps.map(step => html`<li>${step}</li>`)}</ol>
      </section>

      <section>
        <h2>Materials</h2>
        <ul>${this.project.materials.map(m => html`<li>${m}</li>`)}</ul>
      </section>

      ${this.project.relatedPost
        ? html`
            <section>
              <h2>Related Tutorial</h2>
              <a href="/app/post/${this.project.relatedPost}">
                Vintage Sewing Tutorial
              </a>
            </section>`
        : null}
    `;
  }
}
