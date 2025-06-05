import { Comment } from "/Users/arshanaryan/CSC437/packages/server/src/models/comment.ts";


export type Msg =
  | [
      "comment/save",
      {
        commentId: string;
        comment: Comment;
        onSuccess?: () => void;
        onFailure?: (err: Error) => void;
      }
    ]


  | ["comment/select", { commentId: string }]
  | ["comment/save", { comment: Comment }];