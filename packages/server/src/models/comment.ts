// packages/server/src/models/comment.ts

export interface Comment {
  commentId: number;
    user: string;
    date: string;
    pfp?: string;
    text: string;
  }
  