import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import reset from './styles/reset.css.ts';

@customElement('sc-project-view')
export class ProjectView extends LitElement {
  @state() project?: any;

  async connectedCallback() {
    super.connectedCallback();
    const params = new URLSearchParams(location.search);
    if (params.get('type') !== 'project') return;
    const id = params.get('id');
    const res = await fetch('/data/projects.json');
    const list = res.ok ? await res.json() : [];
    this.project = list.find((pr: any) => pr.id === id);
  }

  render() {
    if (!this.project) return html`<p>Project not found.</p>`;
    const pr = this.project;
    const tags = pr.tags.split(',').map((t: string) => t.trim()).filter(Boolean);
    return html`
      <article>
        <h1>${pr.title}</h1>
        <img src=${pr.imgSrc} alt="" />
        <p class="blurb">${pr.blurb}</p>
        ${tags.length ? html`
          <ul class="tags">${tags.map((t: string) => html`<li>${t}</li>`)}</ul>
        ` : null}
      </article>
    `;
  }

  static styles = [
    reset.styles,
    css`
      :host { display:block; padding:var(--space-lg); max-width:60ch; margin:auto; }
      img { width:100%; border-radius:var(--radius-sm); margin:var(--space-md) 0; }
      ul.tags { display:flex; flex-wrap:wrap; gap:var(--space-xs); list-style:none; padding:0; }
      ul.tags li { background:var(--surface-muted); padding:0 var(--space-xs); border-radius:var(--radius-xs); font:var(--font-xs); }
    `
  ];
}
