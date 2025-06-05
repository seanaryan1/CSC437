// packages/app/src/views/comment-view.ts

import { define, View } from "@calpoly/mustang";
import { html } from "lit";
import { property } from "lit/decorators.js";

import { Model } from "../src/model";      // <-- corrected import
import { Msg } from "../src/messages";    // <-- corrected import

export class CommentViewElement extends View<Model, Msg> {
  /** 
   * This property is bound to the URL segment `:id`.
   * In main.ts we wrote: 
   *    view: p => html`<comment-view comment-id=${p.id}></comment-view>`
   * so Mustang will assign `this.commentId = p.id`.
   */
  @property({ attribute: "comment-id" })
  commentId?: string;

  constructor() {
    // “sc:model” must match the `provides="sc:model"` on your <mu-store> in index.html
    super("sc:model");
  }

  render() {
    return html`
      ${this.model.comment
        ? html`
            <article>
              <h2>Comment Details</h2>
              <p><strong>Text:</strong> ${this.model.comment.text}</p>
              <p><strong>User:</strong> ${this.model.comment.user}</p>
              <p><strong>Date:</strong> ${this.model.comment.date}</p>
              ${this.model.comment.pfp
                ? html`<img src=${this.model.comment.pfp} alt="Profile picture" />`
                : html``}
              <p><small>_id: ${this.model.comment._id}</small></p>
              <a href="/app/comment/${this.commentId}/edit">Edit this comment</a>
            </article>
          `
        : html`<p>Loading comment…</p>`}
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    // Only dispatch if we have an actual commentId from the URL
    if (this.commentId && !this.model.comment) {
      this.dispatchMessage([
        "comment/select",
        { commentId: this.commentId },
      ]);
    }
  }
}

define({ "comment-view": CommentViewElement });
