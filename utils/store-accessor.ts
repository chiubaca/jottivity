import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import PostStore from "@/store/Posts";
import AuthStore from "@/store/Auth";
import TagStore from "@/store/Tags";

let Posts: PostStore;
let Auth: AuthStore;
let Tag: TagStore;

function initialiseStores(store: Store<any>): void {
  Posts = getModule(PostStore, store);
  Auth = getModule(AuthStore, store);
  Tag = getModule(TagStore, store);
}

export { initialiseStores, Posts, Auth, Tag };
