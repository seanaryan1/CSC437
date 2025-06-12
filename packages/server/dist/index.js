"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var import_dotenv = __toESM(require("dotenv"));
var import_express = __toESM(require("express"));
var import_mongo = require("./services/mongo");
var import_comments = __toESM(require("./routes/comments"));
var import_posts = __toESM(require("./routes/posts"));
var import_auth = __toESM(require("./routes/auth"));
import_dotenv.default.config();
const app = (0, import_express.default)();
const PORT = Number(process.env.PORT) || 3e3;
(0, import_mongo.connect)("Comments");
app.use(import_express.default.json());
app.use("/api/comments", import_comments.default);
app.use("/api/posts", import_posts.default);
app.use("/api/auth", import_auth.default);
app.listen(PORT, () => {
  console.log(`\u{1F680}  API server up on http://localhost:${PORT}`);
});
