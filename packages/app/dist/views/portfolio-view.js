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
var portfolio_view_exports = {};
__export(portfolio_view_exports, {
  PortfolioViewElement: () => PortfolioViewElement
});
module.exports = __toCommonJS(portfolio_view_exports);
var import_lit = require("lit");
class PortfolioViewElement extends import_lit.LitElement {
  static {
    this.styles = import_lit.css`
    :host { display:block; padding:1rem; }
    h2    { margin-top:1.5rem; }
  `;
  }
  render() {
    return import_lit.html`
      <h1>My Portfolio</h1>

      <section>
        <h2>Featured Projects</h2>
        <ul>
          <li><a href="/app/project/1">Handmade Summer Dress</a></li>
        </ul>
      </section>

      <section>
        <h2>Other Work</h2>
        <ul>
          <li><a href="/app/post/42">Vintage Sewing Tutorial</a></li>
        </ul>
      </section>
    `;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PortfolioViewElement
});
