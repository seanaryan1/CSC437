//src/models/comment.ts

export interface Comment {
    user: string;
    date: string;
    pfp?: string;
    text: string;
  }