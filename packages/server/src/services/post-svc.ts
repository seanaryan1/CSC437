// packages/server/src/services/post-svc.ts
import { Schema, model } from "mongoose";
import type { Post } from "../models/post";

const PostSchema = new Schema<Post>(
  {
    // if you have a custom “slug” or “id” field on Post, index it here:
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true
    },
    title:   { type: String, required: true, trim: true },
    imgSrc:  { type: String, trim: true },
    author:  { type: String, required: true, trim: true },
    date:    { type: String, required: true, trim: true },
    summary: { type: String, required: true, trim: true }
  },
  {
    collection: "Post"   // ← exactly the collection name you see in Atlas
  }
);

const PostModel = model<Post>("Post", PostSchema);

/** Get all posts */
export function index(): Promise<Post[]> {
  return PostModel.find().exec();
}

/** Get one post by its Mongo-generated _id */
export function getById(id: string): Promise<Post | null> {
  return PostModel.findById(id).exec();
}

/** Get one post by your custom `id` field (slug) */
export function getBySlug(slug: string): Promise<Post | null> {
  return PostModel.findOne({ id: slug }).exec();
}

/** Create a new post */
export function create(json: Post): Promise<Post> {
  const p = new PostModel(json);
  return p.save();
}

/** Update an existing post by _id */
export function update(id: string, json: Partial<Post>): Promise<Post> {
  return PostModel.findByIdAndUpdate(id, json, { new: true })
    .exec()
    .then((updated) => {
      if (!updated) throw new Error(`Post ${id} not found`);
      return updated;
    });
}

/** Delete a post by _id */
export function remove(id: string): Promise<void> {
  return PostModel.findByIdAndDelete(id)
    .exec()
    .then((deleted) => {
      if (!deleted) throw new Error(`Post ${id} not found`);
    });
}

export default { index, getById, getBySlug, create, update, remove };
