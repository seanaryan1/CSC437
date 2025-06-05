"use strict";
var import_mustang = require("@calpoly/mustang");
var import_lit = require("lit");
var import_home_view = require("./views/home-view");
var import_comments_view = require("./views/comments-view");
var import_user_view = require("./views/user-view");
var import_portfolio_view = require("./views/portfolio-view");
var import_post_view = require("./views/post-view");
var import_project_view = require("./views/project-view");
const routes = [
  {
    /* /app/post/42  →  <post-view post-id="42"> */
    path: "/app/post/:id",
    view: (p) => import_lit.html`<post-view post-id=${p.id}></post-view>`
  },
  {
    /* /app/project/7  →  <project-view project-id="7"> */
    path: "/app/project/:id",
    view: (p) => import_lit.html`<project-view project-id=${p.id}></project-view>`
  },
  {
    /* static pages you converted earlier */
    path: "/app/comments",
    view: () => import_lit.html`<comments-view></comments-view>`
  },
  {
    path: "/app/portfolio",
    view: () => import_lit.html`<portfolio-view></portfolio-view>`
  },
  {
    path: "/app/user",
    view: () => import_lit.html`<user-view></user-view>`
  },
  {
    /* default landing */
    path: "/app",
    view: () => import_lit.html`<home-view></home-view>`
  },
  {
    /* redirect /  →  /app */
    path: "/",
    redirect: "/app"
  }
];
class AppSwitch extends import_mustang.Switch.Element {
  constructor() {
    super(routes, "sc:history", "sc:auth");
  }
}
(0, import_mustang.define)({
  /* framework providers */
  "mu-auth": import_mustang.Auth.Provider,
  "mu-history": import_mustang.History.Provider,
  "mu-switch": AppSwitch,
  /* views */
  "home-view": import_home_view.HomeViewElement,
  "comments-view": import_comments_view.CommentsViewElement,
  "user-view": import_user_view.UserViewElement,
  "portfolio-view": import_portfolio_view.PortfolioViewElement,
  "post-view": import_post_view.PostView,
  "project-view": import_project_view.ProjectView
});
