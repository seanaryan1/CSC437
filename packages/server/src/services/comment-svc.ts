// server/src/services/comment-svc.ts
import { Schema, model } from "mongoose";
import type { Comment } from "../models/comment";

const CommentSchema = new Schema<Comment>(
  {
    user: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    pfp:  { type: String, trim: true },
    text: { type: String, required: true, trim: true }
  },
  { collection: "CommentSchema" }   // ← match your Compass collection name
);

const CommentModel = model<Comment>("Comment", CommentSchema);

export function getByUser(user: string) {
  return CommentModel.findOne({ user }).exec();
}

// …
export default { getByUser /*, …*/ };
