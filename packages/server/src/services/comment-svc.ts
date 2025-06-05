// packages/server/src/services/comment-svc.ts
import { Schema, model } from "mongoose";
import type { Comment } from "../models/comment";

const CommentSchema = new Schema<Comment>(
  {
    commentId: {
      type: Number,
      required: true,
      unique: true,   // ensure no two comments share the same numeric ID
      index: true     // index it so lookups by commentId are fast
    },
    user: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    pfp: { type: String, trim: true },
    text: { type: String, required: true, trim: true },
  },
  {
    collection: "CommentSchema", 
  }
);

const CommentModel = model<Comment>("Comment", CommentSchema);

/** get all comments */
export function index(): Promise<Comment[]> {
  return CommentModel.find().exec();
}

/** get one by Mongo _id */
export function getById(id: string): Promise<Comment | null> {
  return CommentModel.findById(id).exec();
}

/** get one by the `user` field */
export function getByUser(user: string): Promise<Comment | null> {
  return CommentModel.findOne({ user }).exec();
}

/** create a new comment */
export function create(json: Comment): Promise<Comment> {
  const c = new CommentModel(json);
  return c.save();
}

/** update an existing comment by _id */
export function update(id: string, json: Partial<Comment>): Promise<Comment> {
  return CommentModel.findByIdAndUpdate(id, json, { new: true }).exec()
    .then(updated => {
      if (!updated) throw new Error(`Comment ${id} not found`);
      return updated;
    });
}

/** delete a comment by _id */
export function remove(id: string): Promise<void> {
  return CommentModel.findByIdAndDelete(id).exec()
    .then(deleted => {
      if (!deleted) throw new Error(`Comment ${id} not found`);
    });
}

export default { index, getById, getByUser, create, update, remove };
