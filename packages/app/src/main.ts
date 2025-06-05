/******************************************************************************
 *  Main entry for Sewing & Crafts SPA
 *
 *  - Registers all custom elements (views + framework providers)
 *  - Defines client-side routes for <mu-switch>
 *  - Exports nothing; side-effect registration only.
 ******************************************************************************/

import { Auth, History, Switch, define } from "@calpoly/mustang";
import { html } from "lit";

/* ---------- import view elements ---------- */
import { HomeViewElement }      from "../views/home-view";
import { CommentsViewElement }  from "../views/comments-view";
import { UserViewElement }      from "../views/user-view";
import { PortfolioViewElement } from "../views/portfolio-view";
import { PostView }             from "../views/post-view";
import { ProjectView }          from "../views/project-view";



/* ---------- route table used by <mu-switch> ---------- */
const routes: Switch.Route[] = [
  {
    /* /app/post/42  →  <post-view post-id="42"> */
    path: "/app/post/:id",
    view: p => html`<post-view post-id=${p.id}></post-view>`
  },
  {
    /* /app/project/7  →  <project-view project-id="7"> */
    path: "/app/project/:id",
    view: p => html`<project-view project-id=${p.id}></project-view>`
  },
  {
    /* static pages you converted earlier */
    path: "/app/comments",
    view: () => html`<comments-view></comments-view>`
  },
  {
    path: "/app/portfolio",
    view: () => html`<portfolio-view></portfolio-view>`
  },
  {
    path: "/app/user",
    view: () => html`<user-view></user-view>`
  },
  {
    /* default landing */
    path: "/app",
    view: () => html`<home-view></home-view>`
  },
  {
    /* redirect /  →  /app */
    path: "/",
    redirect: "/app"
  }
];

/* ---------- custom <mu-switch> bound to the route table ---------- */
class AppSwitch extends Switch.Element {
  constructor() {
    super(routes, "sc:history", "sc:auth"); // ← names must match index.html
  }
}

/* ---------- register everything once with Mustang ---------- */
define({
  /* framework providers */
  "mu-auth":    Auth.Provider,
  "mu-history": History.Provider,
  "mu-switch":  AppSwitch,

  /* views */
  "home-view":       HomeViewElement,
  "comments-view":   CommentsViewElement,
  "user-view":       UserViewElement,
  "portfolio-view":  PortfolioViewElement,
  "post-view":       PostView,
  "project-view":    ProjectView
});
