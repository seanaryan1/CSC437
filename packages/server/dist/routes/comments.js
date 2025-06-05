"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var comments_exports = {};
__export(comments_exports, {
  default: () => comments_default
});
module.exports = __toCommonJS(comments_exports);
var import_express = require("express");
var import_comment_svc = __toESM(require("../services/comment-svc"));
const router = (0, import_express.Router)();
router.get("/", async (_req, res) => {
  try {
    const list = await import_comment_svc.default.index();
    res.json(list);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const c = await import_comment_svc.default.getById(req.params.id);
    if (c) res.json(c);
    else res.status(404).end();
  } catch (err) {
    res.status(500).send(err);
  }
});
router.get("/user/:user", async (req, res) => {
  try {
    const cs = await import_comment_svc.default.getByUser(req.params.user);
    res.json(cs);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.post("/", async (req, res) => {
  try {
    const newComment = await import_comment_svc.default.create(req.body);
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.put("/:id", async (req, res) => {
  try {
    const updated = await import_comment_svc.default.update(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(404).send(err);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    await import_comment_svc.default.remove(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(404).send(err);
  }
});
var comments_default = router;
