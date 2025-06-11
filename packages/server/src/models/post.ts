// packages/server/src/models/post.ts
export interface Post {
  title: string;
  content: string;
  authorId: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}
