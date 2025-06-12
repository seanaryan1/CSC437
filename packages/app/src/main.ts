// packages/app/src/main.ts

import { Auth, History, Switch, Store, define } from "@calpoly/mustang";
import { html } from "lit";

import { Model, init } from "./model";
import update from "./update";
import { Msg } from "./messages";

/* ---------- import your view elements ---------- */
import { HomeViewElement      } from "../views/home-view";
import { CommentViewElement   } from "../views/comment-view";
import { CommentEditElement   } from "../views/comment-edit";
import { UserViewElement      } from "../views/user-view";
import { PortfolioViewElement } from "../views/portfolio-view";
import { PostViewElement             } from "../views/post-view";
import { ProjectView          } from "../views/project-view";

/* ---------- route table used by <mu-switch> ---------- */
const routes: Switch.Route[] = [
  /* POST details: /app/post/42 → <post-view post-id="42"> */
  {
    path: "/app/post/:id",
    view: p => html`<post-view post-id=${p.id}></post-view>`
  },

  /* PROJECT details: /app/project/7 → <project-view project-id="7"> */
  {
    path: "/app/project/:id",
    view: p => html`<project-view project-id=${p.id}></project-view>`
  },

  /* LIST all comments: /app/comments → <comments-view> */
  {
    path: "/app/comments",
    view: () => html`<comments-view></comments-view>`
  },

  /* VIEW a single comment: /app/comment/:id → <comment-view comment-id="…"> */
  {
    path: "/app/comment/:id",
    view: p => html`<comment-view comment-id=${p.id}></comment-view>`
  },

  /* EDIT a single comment: /app/comment/:id/edit → <comment-edit> */
  {
    path: "/app/comment/:id/edit",
    view: p => html`<comment-edit comment-id=${p.id}></comment-edit>`
  },

  /* PORTFOLIO page: /app/portfolio → <portfolio-view> */
  {
    path: "/app/portfolio",
    view: () => html`<portfolio-view></portfolio-view>`
  },

  /* USER page: /app/user → <user-view> */
  {
    path: "/app/user",
    view: () => html`<user-view></user-view>`
  },

  /* default landing: /app → <home-view> */
  {
    path: "/app",
    view: () => html`<home-view></home-view>`
  },

  /* redirect root "/" to "/app" */
  {
    path: "/",
    redirect: "/app"
  }
];

/* ---------- custom <mu-switch> bound to the route table ---------- */
class AppSwitch extends Switch.Element {
  constructor() {
    super(routes, "sc:history", "sc:auth");
  }
}

/* ---------- register everything with Mustang ---------- */
define({
  /* framework providers */
  "mu-auth":    Auth.Provider,
  "mu-history": History.Provider,
  "mu-switch":  AppSwitch,

  /* single global store */
  "mu-store": class AppStore extends Store.Provider<Model, Msg> {
    constructor() {
      // “sc:auth” matches your <mu-auth provides="sc:auth"> in index.html
      super(update, init, "sc:auth");
    }
  },

  /* your view components (LitElements) */
  "home-view":       HomeViewElement,
  "comment-view":    CommentViewElement,
  "comment-edit":    CommentEditElement,
  "portfolio-view":  PortfolioViewElement,
  "user-view":       UserViewElement,
  "post-view":       PostViewElement,
  "project-view":    ProjectView
});
