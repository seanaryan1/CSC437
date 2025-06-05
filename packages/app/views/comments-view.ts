import { LitElement, html, css } from "lit";

export class CommentsViewElement extends LitElement {
  static styles = css`:host{display:block;padding:1rem;}`;

  render() {
    return html`
      <h1>Comments</h1>
      <sc-comments-list src="/api/comments"></sc-comments-list>
    `;
  }
}
