import { LitElement, html, css } from 'lit';
import { property, state } from 'lit/decorators.js';
import { define } from '@calpoly/mustang';
import { ProjectElement } from './project.ts';

export class ProjectList extends LitElement {
  @property() src?: string;
  @state() projects: Array<any> = [];

  connectedCallback() { super.connectedCallback(); if (this.src) this.load(); }

  private async load() {
    const res = await fetch(this.src!);
    this.projects = res.ok ? await res.json() : [];
  }

  render() {
    return html`
      <div class="grid">
        ${this.projects.map(pr => html`
          <sc-project
            img-src=${pr.imgSrc}
            href=${`/viewer.html?type=project&id=${pr.id}`}
            tags=${pr.tags}
          >
            ${pr.title}
            <span slot="blurb">${pr.blurb}</span>
          </sc-project>
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
    'sc-project': ProjectElement,   
    'sc-project-list': ProjectList
  });