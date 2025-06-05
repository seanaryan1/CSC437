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
var user_view_exports = {};
__export(user_view_exports, {
  UserViewElement: () => UserViewElement
});
module.exports = __toCommonJS(user_view_exports);
var import_lit = require("lit");
class UserViewElement extends import_lit.LitElement {
  static {
    this.styles = import_lit.css`
    :host { display:block; padding:1rem; }
    h2    { margin-top:1.25rem; }
  `;
  }
  render() {
    return import_lit.html`
      <section>
        <h2>About Me</h2>
        <p><b>Name:</b> Sean</p>
        <p><b>Interests:</b> Sewing, knitting, DIY fashion design</p>
      </section>

      <section>
        <h2>Links</h2>
        <ul>
          <li><a href="/app/portfolio">My Portfolio</a></li>
          <li><a href="/app/post/42">My Posts</a></li>
        </ul>
      </section>
    `;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserViewElement
});
