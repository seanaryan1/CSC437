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
var home_view_exports = {};
__export(home_view_exports, {
  HomeViewElement: () => HomeViewElement
});
module.exports = __toCommonJS(home_view_exports);
var import_lit = require("lit");
class HomeViewElement extends import_lit.LitElement {
  static {
    this.styles = import_lit.css`
    :host { display:block; padding:1rem; }
    h2    { margin:1.5rem 0 .5rem; }
  `;
  }
  render() {
    return import_lit.html`
      <section>
        <h2>Latest Posts</h2>
        <sc-post-list src="/api/posts"></sc-post-list>
      </section>

      <section>
        <h2>Featured Projects</h2>
        <sc-project-list src="/api/projects"></sc-project-list>
      </section>
    `;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HomeViewElement
});
