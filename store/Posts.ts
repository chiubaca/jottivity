import { Module, VuexModule, Action, Mutation } from "vuex-module-decorators";
import store from "vuex";
import { $axios } from "~/utils/api";
// import { $axios } from "~/utils/api";

type JAllPosts = {
  [postID: string]: JPost[];
};

type JPost = {
  title: string;
  contents: string;
  createAt: number;
};

@Module({
  namespaced: true,
  stateFactory: true,
  store: store as any
})
export default class Posts extends VuexModule {
  posts: JAllPosts = {};

  @Mutation
  SETUP_POSTS(journalId: string) {
    this.posts[journalId] = [];
  }

  @Mutation
  DELETE_ALL_POSTS(journalId: string) {
    delete this.posts[journalId];
  }

  @Action({ rawError: true })
  async createPost(post: JPost) {
    const tokens = this.context.rootState.Auth.user.tokens;
    try {
      const resp = await $axios.$post(
        "post",
        { ...post },
        { headers: { Authorization: tokens.accessToken } }
      );
    } catch (err) {
      console.error("server error creating journal", err);
      return err;
    }
  }
}
