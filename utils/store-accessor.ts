import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import PostStore from "@/store/Posts";
import AuthStore from "@/store/Auth";

let Posts: PostStore;
let Auth: AuthStore;

function initialiseStores(store: Store<any>): void {
  Posts = getModule(PostStore, store);
  Auth = getModule(AuthStore, store);
}

export { initialiseStores, Posts, Auth };
