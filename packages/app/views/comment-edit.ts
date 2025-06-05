// packages/app/src/views/comment-edit.ts

import { define, Form, View, History } from "@calpoly/mustang";
import { html } from "lit";
import { property, state } from "lit/decorators.js";

import type { Comment } from ".../../server/src/models/comment";
import type { Model } from "../src/model";
import type { Msg } from "../src/messages";

export class CommentEditElement extends View<Model, Msg> {
  static uses = define({
    "mu-form": Form.Element,
  });

  @property({ attribute: "comment-id" })
  commentId?: string;

  @state()
  private get comment(): Comment | undefined {
    return this.model.comment;
  }

  constructor() {
    super("sc:model");
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.commentId && !this.model.comment) {
      this.dispatchMessage([
        "comment/select",
        { commentId: this.commentId },
      ]);
    }
  }

  render() {
    if (!this.comment) {
      return html`<p>Loading comment…</p>`;
    }

    return html`
      <main class="page">
        <h2>Edit Comment</h2>

        <!-- Only a single “Submit” button below -->
        <mu-form
          .init=${{ text: this.comment.text }}
          @mu-form:submit=${this.handleSubmit}
        >
          <label for="text">Text:</label>
          <input name="text" id="text" type="text" />
        </mu-form>

        <p>
          <strong>User:</strong> ${this.comment.user}  
          (cannot be changed)
        </p>
      </main>
    `;
  }

  private handleSubmit(event: Form.SubmitEvent<{ text: string }>) {
    event.preventDefault();

    if (!this.commentId || !this.comment) {
      console.error("No commentId or no comment loaded");
      return;
    }

    const updatedComment: Comment = {
      ...this.comment,
      text: event.detail.text,
    };

    this.dispatchMessage([
      "comment/save",
      {
        commentId: this.commentId,
        comment: updatedComment,
        onSuccess: () => {
          History.dispatch(this, "history/navigate", {
            href: `/app/comment/${this.commentId}`,
          });
        },
        onFailure: (err: Error) => {
          console.error("Error saving comment:", err);
        },
      },
    ]);
  }
}

define({ "comment-edit": CommentEditElement });
