import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import PostStore from "@/store/Posts";

let Posts: PostStore;

function initialiseStores(store: Store<any>): void {
  Posts = getModule(PostStore, store);
}

export { initialiseStores, Posts };
