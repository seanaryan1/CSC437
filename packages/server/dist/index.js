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
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var index_exports = {};
module.exports = __toCommonJS(index_exports);
var import_express = __toESM(require("express"));
var import_mongo = require("./services/mongo");
var import_comments2 = __toESM(require("./routes/comments"));
var import_auth = __toESM(require("./routes/auth"));
var import_promises = __toESM(require("node:fs/promises"));
var import_node_path = __toESM(require("node:path"));
var import_auth2 = __toESM(require("./routes/auth"));
__reExport(index_exports, require("./models/comment"), module.exports);
__reExport(index_exports, require("./models/credential"), module.exports);
__reExport(index_exports, require("./models/project"), module.exports);
__reExport(index_exports, require("./models/userProfile"), module.exports);
const app = (0, import_express.default)();
app.use("/auth", import_auth.default);
(0, import_mongo.connect)("Comments");
const port = process.env.PORT || 3e3;
const staticDir = process.env.STATIC || "public";
app.use(import_express.default.static(staticDir));
app.use(import_express.default.json());
app.use("/api/comments", import_comments2.default);
app.use("/api", import_auth2.default);
app.listen(3e3, () => console.log("Server running on port 3000"));
app.get("/hello", (_req, res) => {
  res.send("Hello, World");
});
app.use("/app", async (_req, res) => {
  const htmlPath = import_node_path.default.resolve(staticDir, "index.html");
  const html = await import_promises.default.readFile(htmlPath, "utf8");
  res.send(html);
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ...require("./models/comment"),
  ...require("./models/credential"),
  ...require("./models/project"),
  ...require("./models/userProfile")
});
