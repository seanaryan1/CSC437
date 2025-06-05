import { LitElement, html, css } from "lit";

export class PortfolioViewElement extends LitElement {
  static styles = css`
    :host { display:block; padding:1rem; }
    h2    { margin-top:1.5rem; }
  `;

  render() {
    return html`
      <h1>My Portfolio</h1>

      <section>
        <h2>Featured Projects</h2>
        <ul>
          <li><a href="/app/project/1">Handmade Summer Dress</a></li>
        </ul>
      </section>

      <section>
        <h2>Other Work</h2>
        <ul>
          <li><a href="/app/post/42">Vintage Sewing Tutorial</a></li>
        </ul>
      </section>
    `;
  }
}
