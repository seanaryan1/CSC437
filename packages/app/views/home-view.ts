// packages/app/src/views/home-view.ts
import { LitElement, html, css } from "lit";
import { state } from "lit/decorators.js";

interface Post {
  id:      string;
  title:   string;
  imgSrc:  string;
  author:  string;
  date:    string;
  summary: string;
}

export class HomeViewElement extends LitElement {
  @state()
  private posts: Post[] | null = null;

  static styles = css`
    :host { display:block; padding:1rem; }
    h2    { margin:1.5rem 0 .5rem; }

    .masonry {
      column-count: 3;
      column-gap: 1rem;
    }
    .item {
      break-inside: avoid;
      background: #fff;
      border-radius: 6px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      margin-bottom: 1rem;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }
    .item img {
      width: 100%;
      display: block;
    }
    .item-content {
      padding: 0.75rem;
      flex: 1;
    }
    .item-content h3 {
      margin: 0 0 0.5rem;
      font-size: 1.1rem;
    }
    .item-content p {
      font-size: 0.9rem;
      line-height: 1.3;
      color: #333;
    }
    @media (max-width: 800px) {
      .masonry { column-count: 2; }
    }
    @media (max-width: 500px) {
      .masonry { column-count: 1; }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    fetch("/api/posts")
      .then(res => res.json())
      .then((posts: Post[]) => (this.posts = posts))
      .catch(err => {
        console.error("Failed to load posts:", err);
        this.posts = [];
      });
  }

  render() {
    return html`
      <section>
        <h2>Latest Posts</h2>
        ${this.posts === null
          ? html`<p>Loading posts…</p>`
          : html`
              <div class="masonry">
                ${this.posts.map(
                  p => html`
                    <div class="item">
                      <a href="/app/post/${p.id}">
                        ${p.imgSrc ? html`<img src=${p.imgSrc} alt=${p.title}/>` : ``}
                        <div class="item-content">
                          <h3>${p.title}</h3>
                          <p>${p.summary}</p>
                        </div>
                      </a>
                    </div>
                  `
                )}
              </div>
            `}
      </section>

      <section>
        <h2>Featured Projects</h2>
        <sc-project-list src="/api/projects"></sc-project-list>
      </section>
    `;
  }
}

customElements.define("home-view", HomeViewElement);
