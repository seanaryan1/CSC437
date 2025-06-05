import { LitElement, html, css } from "lit";

export class HomeViewElement extends LitElement {
  static styles = css`
    :host { display:block; padding:1rem; }
    h2    { margin:1.5rem 0 .5rem; }
  `;

  render() {
    return html`
      <section>
        <h2>Latest Posts</h2>
        <sc-post-list src="/api/posts"></sc-post-list>
      </section>

      <section>
        <h2>Featured Projects</h2>
        <sc-project-list src="/api/projects"></sc-project-list>
      </section>
    `;
  }
}
