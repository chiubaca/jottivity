import VuexPersistence from "vuex-persist";
import { Context } from "@nuxt/types";

export default ({ store }: Context) => {
  new VuexPersistence({
    /* your options */
    key: "store", // The key to store the state on in the storage provider.
    storage: window.localStorage
  }).plugin(store);
};
