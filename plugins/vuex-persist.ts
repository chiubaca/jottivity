import VuexPersistence from "vuex-persist";
import { Context } from "@nuxt/types";

export default ({ store }: Context) => {
  new VuexPersistence({
    key: "store",
    storage: window.localStorage
  }).plugin(store);
};
