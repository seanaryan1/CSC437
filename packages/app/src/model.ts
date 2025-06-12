/* Front-end in-memory model shared by all views */
import { Comment } from "/Users/arshanaryan/CSC437/packages/server/src/models/comment.ts"; // existing import
import { Post }    from "/Users/arshanaryan/CSC437/packages/server/src/models/post.ts";    // new import

export interface Model {
  // Comments
  commentId?: string;  // currently selected comment
  comment?:   Comment; // the loaded comment object

  // Posts
  postId?: string;     // currently selected post
  post?:   Post;       // the loaded post object
}

export const init: Model = {};
