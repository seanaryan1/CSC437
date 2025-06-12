// packages/app/src/views/post-view.ts

import { define, View } from "@calpoly/mustang";
import { html } from "lit";
import { property } from "lit/decorators.js";

import { Model } from "../src/model";
import { Msg }   from "../src/messages";

export class PostViewElement extends View<Model, Msg> {
  /**
   * Bound to the URL segment `:id` by your router:
   *   view: p => html`<post-view post-id=${p.id}></post-view>`
   */
  @property({ attribute: "post-id" })
  postId?: string;

  constructor() {
    // “sc:model” must match the <mu-store provides="sc:model"> in index.html
    super("sc:model");
  }

  render() {
    return html`
      ${this.model.post
        ? html`
            <article>
              <h2>${this.model.post.title}</h2>
              <p>
                <strong>By:</strong> ${this.model.post.author}
                &nbsp;|&nbsp;
                <strong>Date:</strong> ${new Date(this.model.post.date).toLocaleDateString()}
              </p>
              ${this.model.post.imgSrc
                ? html`<img src=${this.model.post.imgSrc} alt="Image for ${this.model.post.title}" />`
                : html``}
              <section>
                <p>${this.model.post.summary}</p>
              </section>
              <a href="/app/post/${this.postId}/edit">Edit this post</a>
            </article>
          `
        : html`<p>Loading post…</p>`}
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.postId && !this.model.post) {
      this.dispatchMessage([
        "post/select",
        { postId: this.postId },
      ]);
    }
  }
}

define({ "post-view": PostViewElement });
