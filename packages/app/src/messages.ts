// packages/app/src/messages.ts

import type { Comment } from "/Users/arshanaryan/CSC437/packages/server/src/models/comment.ts";
import type { Post }    from "/Users/arshanaryan/CSC437/packages/server/src/models/post.ts";

export type Msg =
  /**
   * Load a single comment by its ID
   * (dispatched by <comment-view> on connect)
   */
  | ["comment/select", { commentId: string }]

  /**
   * Save (PUT) an updated comment
   * onSuccess/onFailure are optional callbacks
   */
  | [
      "comment/save",
      {
        commentId: string;
        comment: Comment;
        onSuccess?: () => void;
        onFailure?: (err: Error) => void;
      }
    ]

  /**
   * Load a single post by its ID
   * (dispatched by <post-view> on connect)
   */
  
// at the bottom of your Msg union…
| ["comment/index"]                         // load all comments
| ["comment/loaded",  { comments: Comment[] }] 
| ["post/index"]                            // load all posts
| ["post/loaded",     { posts: Post[] }]

  | ["post/select", { postId: string }];

  