import { define, Form, View } from "@calpoly/mustang";
import { html } from "lit";
import { property } from "lit/decorators.js";
import { Comment } from ".../../server/src/models/comment"; 
import { Model } from "../src/model";
import { Msg } from "../src/messages";
import { state } from "lit/decorators.js";
import { History } from "@calpoly/mustang";

export class CommentEditElement extends View<Model, Msg> {
  static uses = define({
    "mu-form": Form.Element,
  });

  @property({ attribute: "comment-id" })
  commentId?: string;

  @state()
  get comment(): Comment | undefined {
    return this.model.comment;
  }

  render() {
    return html`
      <main class="page">
        <h2>Edit Comment</h2>
        <mu-form
          .init=${this.comment}
          @mu-form:submit=${this.handleSubmit}>
          <label>Text: <input name="text" /></label>
          <label>User: <input name="user" /></label>
          <button type="submit">Save</button>
        </mu-form>
      </main>
    `;
  }

  handleSubmit(event: Form.SubmitEvent<Comment>) {
    this.dispatchMessage([
      "comment/save",
      {
        commentId: this.commentId!,
        comment: event.detail,
        onSuccess: () =>
            History.dispatch(this, "history/navigate", {
              href: `/app/comment/${this.commentId}`
            }),
        onFailure: (err: Error) => console.error("Error saving:", err)
      }
    ]);
  }
}

define({ "comment-edit": CommentEditElement });
