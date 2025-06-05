import { Comment } from "/Users/arshanaryan/CSC437/packages/server/src/models/comment.ts";

export type Msg =
  | ["comment/select", { commentId: string }]
  | ["comment/save", { comment: Comment }];