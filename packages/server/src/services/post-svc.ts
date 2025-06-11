// packages/server/src/services/post-svc.ts
import { Schema, model } from "mongoose";
import type { Post } from "../models/post";

const PostSchema = new Schema<Post>(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    authorId: { type: String, required: true, trim: true },
    imageUrl: { type: String, trim: true },
    createdAt: { type: String, required: true, trim: true },
    updatedAt: { type: String, required: true, trim: true },
  },
  {
    collection: "Post",
  }
);

const PostModel = model<Post>("Post", PostSchema);

export function index(): Promise<Post[]> {
  return PostModel.find().exec();
}

export function getById(id: string): Promise<Post | null> {
  return PostModel.findById(id).exec();
}

export function create(json: Post): Promise<Post> {
  const p = new PostModel(json);
  return p.save();
}

export function update(id: string, json: Partial<Post>): Promise<Post> {
  return PostModel.findByIdAndUpdate(id, json, { new: true }).exec().then(updated => {
    if (!updated) throw new Error(`Post ${id} not found`);
    return updated;
  });
}

export function remove(id: string): Promise<void> {
  return PostModel.findByIdAndDelete(id).exec().then(deleted => {
    if (!deleted) throw new Error(`Post ${id} not found`);
  });
}

export default { index, getById, create, update, remove };
