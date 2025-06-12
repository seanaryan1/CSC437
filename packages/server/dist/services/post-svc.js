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
var post_svc_exports = {};
__export(post_svc_exports, {
  create: () => create,
  default: () => post_svc_default,
  getById: () => getById,
  getBySlug: () => getBySlug,
  index: () => index,
  remove: () => remove,
  update: () => update
});
module.exports = __toCommonJS(post_svc_exports);
var import_mongoose = require("mongoose");
const PostSchema = new import_mongoose.Schema(
  {
    // if you have a custom “slug” or “id” field on Post, index it here:
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true
    },
    title: { type: String, required: true, trim: true },
    imgSrc: { type: String, trim: true },
    author: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    summary: { type: String, required: true, trim: true }
  },
  {
    collection: "Post"
    // ← exactly the collection name you see in Atlas
  }
);
const PostModel = (0, import_mongoose.model)("Post", PostSchema);
function index() {
  return PostModel.find().exec();
}
function getById(id) {
  return PostModel.findById(id).exec();
}
function getBySlug(slug) {
  return PostModel.findOne({ id: slug }).exec();
}
function create(json) {
  const p = new PostModel(json);
  return p.save();
}
function update(id, json) {
  return PostModel.findByIdAndUpdate(id, json, { new: true }).exec().then((updated) => {
    if (!updated) throw new Error(`Post ${id} not found`);
    return updated;
  });
}
function remove(id) {
  return PostModel.findByIdAndDelete(id).exec().then((deleted) => {
    if (!deleted) throw new Error(`Post ${id} not found`);
  });
}
var post_svc_default = { index, getById, getBySlug, create, update, remove };
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  create,
  getById,
  getBySlug,
  index,
  remove,
  update
});
