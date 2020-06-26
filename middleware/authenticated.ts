import { Middleware } from "@nuxt/types";

const auth: Middleware = (context) => {
  if (!context.store.getters["Auth/isSignedIn"]) {
    alert("You need to sign in");
    context.redirect("/login");
  }
};

export default auth;
