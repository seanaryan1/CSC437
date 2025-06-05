// packages/app/src/views/comments-view.ts
import { define, View } from "@calpoly/mustang";
import { html } from "lit";
import { Model } from "../src/model";          // <-- Correct import from model.ts
import { Msg } from "../src/messages";        // <-- Correct import from messages.ts

export class CommentsViewElement extends View<Model, Msg> {
  constructor() {
    super("sc:model");
  }

  render() {
    return html`
      ${this.model.comment 
        ? html`<p>${this.model.comment.text}</p>` 
        : html`<p>Select a comment to view details.</p>`}
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.model.comment) {
      this.dispatchMessage(["comment/select", { commentId: "12345" }]); // Example commentId
    }
  }
}

define({ "comments-view": CommentsViewElement });
