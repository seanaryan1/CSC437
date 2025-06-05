"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var comment_svc_exports = {};
__export(comment_svc_exports, {
  create: () => create,
  default: () => comment_svc_default,
  getById: () => getById,
  getByUser: () => getByUser,
  index: () => index,
  remove: () => remove,
  update: () => update
});
module.exports = __toCommonJS(comment_svc_exports);
var import_mongoose = require("mongoose");
const CommentSchema = new import_mongoose.Schema(
  {
    commentId: {
      type: Number,
      required: true,
      unique: true,
      // ensure no two comments share the same numeric ID
      index: true
      // index it so lookups by commentId are fast
    },
    user: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    pfp: { type: String, trim: true },
    text: { type: String, required: true, trim: true }
  },
  {
    collection: "CommentSchema"
  }
);
const CommentModel = (0, import_mongoose.model)("Comment", CommentSchema);
function index() {
  return CommentModel.find().exec();
}
function getById(id) {
  return CommentModel.findById(id).exec();
}
function getByUser(user) {
  return CommentModel.findOne({ user }).exec();
}
function create(json) {
  const c = new CommentModel(json);
  return c.save();
}
function update(id, json) {
  return CommentModel.findByIdAndUpdate(id, json, { new: true }).exec().then((updated) => {
    if (!updated) throw new Error(`Comment ${id} not found`);
    return updated;
  });
}
function remove(id) {
  return CommentModel.findByIdAndDelete(id).exec().then((deleted) => {
    if (!deleted) throw new Error(`Comment ${id} not found`);
  });
}
var comment_svc_default = { index, getById, getByUser, create, update, remove };
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  create,
  getById,
  getByUser,
  index,
  remove,
  update
});
