// packages/app/src/update.ts
import { Auth, Update } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model } from "./model";
import { Comment } from ".../../server/src/models/comment"; // ← make sure you import Comment

export default function update(
  message: Msg,
  apply: Update.ApplyMap<Model>,
  user: Auth.User
) {
  switch (message[0]) {
    case "comment/select": {
      // TypeScript knows message[1] is { commentId: string } here
      const { commentId } = message[1];
      loadComment({ commentId }, user)
        .then((comment) => {
          // comment might be undefined if fetch failed, but we’ll overwrite model.comment anyway
          apply((model) => ({ ...model, comment: comment }));
        })
        .catch((err) => {
          console.error("Failed to load comment:", err);
        });
      break;
    }

    case "comment/save": {
      // Narrow message[1] so TS knows it has commentId, comment, onSuccess, onFailure
      const payload = message[1] as {
        commentId: string;
        comment: Comment;
        onSuccess?: () => void;
        onFailure?: (err: Error) => void;
      };

      // Only pass exactly { commentId, comment } to saveComment
      saveComment(
        { commentId: payload.commentId, comment: payload.comment },
        user
      )
        .then((updatedComment) => {
          apply((model) => ({ ...model, comment: updatedComment }));
        })
        .then(() => {
          if (payload.onSuccess) {
            payload.onSuccess();
          }
        })
        .catch((err: Error) => {
          if (payload.onFailure) {
            payload.onFailure(err);
          }
        });
      break;
    }

    default:
      // If you ever hit a message type that isn’t handled above, this will throw.
      // TS will let you know at compile time if you forgot to cover a case in the Msg union.
      const unhandled: never = message[0];
      throw new Error(`Unhandled message "${unhandled}"`);
  }
}

/** 
 * Fetch a single comment by ID from the backend 
 * Returns a Promise<Comment | undefined>
 */
async function loadComment(
  payload: { commentId: string },
  user: Auth.User
): Promise<Comment | undefined> {
  const res = await fetch(`/api/comments/${payload.commentId}`, {
    headers: Auth.headers(user),
  });
  if (!res.ok) {
    return undefined;
  }
  return (await res.json()) as Comment;
}

/** 
 * Send a PUT to update a comment. Returns a Promise<Comment> on success, 
 * or throws if the status is not 200. 
 */
function saveComment(
  msg: { commentId: string; comment: Comment },
  user: Auth.User
): Promise<Comment> {
  return fetch(`/api/comments/${msg.commentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user),
    },
    body: JSON.stringify(msg.comment),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to save comment ${msg.commentId}`);
      }
      return res.json();
    })
    .then((json) => json as Comment);
}
