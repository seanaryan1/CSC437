import { LitElement, html, css } from "lit";

export class UserViewElement extends LitElement {
  static styles = css`
    :host { display:block; padding:1rem; }
    h2    { margin-top:1.25rem; }
  `;

  render() {
    return html`
      <section>
        <h2>About Me</h2>
        <p><b>Name:</b> Sean</p>
        <p><b>Interests:</b> Sewing, knitting, DIY fashion design</p>
      </section>

      <section>
        <h2>Links</h2>
        <ul>
          <li><a href="/app/portfolio">My Portfolio</a></li>
          <li><a href="/app/post/42">My Posts</a></li>
        </ul>
      </section>
    `;
  }
}
