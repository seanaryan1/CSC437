import { Auth, History, Switch, Store, define } from "@calpoly/mustang";
import { html } from "lit";

import { Model, init } from "./model";
import update from "./update";
import { Msg } from "./messages";

/* import your views */
import { HomeViewElement } from "../views/home-view";
import { CommentsViewElement } from "../views/comments-view";
import { UserViewElement } from "../views/user-view";
import { PortfolioViewElement } from "../views/portfolio-view";
import { PostView } from "../views/post-view";
import { ProjectView } from "../views/project-view";

/* Routes */
const routes: Switch.Route[] = [
  { path: "/app/post/:id", view: p => html`<post-view post-id=${p.id}></post-view>` },
  { path: "/app/project/:id", view: p => html`<project-view project-id=${p.id}></project-view>` },
  { path: "/app/comments", view: () => html`<comments-view></comments-view>` },
  { path: "/app/portfolio", view: () => html`<portfolio-view></portfolio-view>` },
  { path: "/app/user", view: () => html`<user-view></user-view>` },
  { path: "/app", view: () => html`<home-view></home-view>` },
  { path: "/", redirect: "/app" }
];

/* Custom Switch Element */
class AppSwitch extends Switch.Element {
  constructor() {
    super(routes, "sc:history", "sc:auth");
  }
}

/* Define custom elements */
define({
  "mu-auth": Auth.Provider,
  "mu-history": History.Provider,
  "mu-switch": AppSwitch,
  "mu-store": class AppStore extends Store.Provider<Model, Msg> {
    constructor() {
      super(update, init, "sc:auth");
    }
  },

  "home-view": HomeViewElement,
  "comments-view": CommentsViewElement,
  "user-view": UserViewElement,
  "portfolio-view": PortfolioViewElement,
  "post-view": PostView,
  "project-view": ProjectView
});
