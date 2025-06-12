// packages/app/src/update.ts
import { Auth, Update } from "@calpoly/mustang";
import type { Msg }     from "./messages";
import type { Model }   from "./model";
import type { Comment } from ".../../server/src/models/comment";
import type { Post }    from ".../../server/src/models/post";

export default function update(
  message: Msg,
  apply: Update.ApplyMap<Model>,
  user: Auth.User
) {
  switch (message[0]) {
    // ─── COMMENTS ───────────────────────────────────────────────────────────
    case "comment/select": {
      const { commentId } = message[1];
      loadComment({ commentId }, user)
        .then((comment) => apply((model) => ({ ...model, comment })))
        .catch((err) => console.error("Failed to load comment:", err));
      break;
    }

    case "comment/save": {
      const { commentId, comment, onSuccess, onFailure } = message[1];
      saveComment({ commentId, comment }, user)
        .then((updated) => {
          apply((model) => ({ ...model, comment: updated }));
          onSuccess?.();
        })
        .catch((err) => {
          console.error("Failed to save comment:", err);
          onFailure?.(err);
        });
      break;
    }
        // ─── load all comments ───────────────────────────────────────────────
        case "comment/index": {
          fetch("/api/comments", { headers: Auth.headers(user) })
            .then(r => r.json())
            .then((comments: Comment[]) =>
              apply(m => ({ ...m, comments }))
            )
            .catch(err => console.error("Failed to load comments:", err));
          break;
        }
    
        // ─── load all posts ──────────────────────────────────────────────────
        case "post/index": {
          fetch("/api/posts", { headers: Auth.headers(user) })
            .then(r => r.json())
            .then((posts: Post[]) =>
              apply(m => ({ ...m, posts }))
            )
            .catch(err => console.error("Failed to load posts:", err));
          break;
        }
    

    // ─── POSTS ───────────────────────────────────────────────────────────────
    case "post/select": {
      const { postId } = message[1];
      loadPost({ postId }, user)
        .then((post) => apply((model) => ({ ...model, post })))
        .catch((err) => console.error("Failed to load post:", err));
      break;
    }

    default:
      const _exhaustive: unknown = message[0];
      throw new Error(`Unhandled message "${_exhaustive}"`);
  }
}

/** Fetch a single comment by ID **/
async function loadComment(
  payload: { commentId: string },
  user: Auth.User
): Promise<Comment | undefined> {
  const res = await fetch(`/api/comments/${payload.commentId}`, {
    headers: Auth.headers(user),
  });
  if (!res.ok) return undefined;
  return res.json() as Promise<Comment>;
}

/** PUT to update a comment **/
async function saveComment(
  msg: { commentId: string; comment: Comment },
  user: Auth.User
): Promise<Comment> {
  const res = await fetch(`/api/comments/${msg.commentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user),
    },
    body: JSON.stringify(msg.comment),
  });
  if (!res.ok) {
    throw new Error(`Failed to save comment ${msg.commentId}`);
  }
  return res.json() as Promise<Comment>;
}

/** Fetch a single post by ID **/
async function loadPost(
  payload: { postId: string },
  user: Auth.User
): Promise<Post | undefined> {
  const res = await fetch(`/api/posts/${payload.postId}`, {
    headers: Auth.headers(user),
  });
  if (!res.ok) return undefined;
  return res.json() as Promise<Post>;
}
