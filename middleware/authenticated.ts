import { Middleware } from "@nuxt/types";

const auth: Middleware = (context) => {
  const { isDev } = context;
  // Use context
  console.log(isDev);
};

export default auth;
