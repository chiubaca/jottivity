import Vue from "vue";
import { Module, VuexModule, Action, Mutation } from "vuex-module-decorators";
import store from "vuex";
import { JAllPosts, JPost, JJournal } from "@/types";
// import { $axios } from "~/utils/api";

@Module({
  namespaced: true,
  stateFactory: true,
  store: store as any
})
export default class Posts extends VuexModule {
  allPosts: JAllPosts = {};

  journalMeta: JJournal | undefined = undefined;

  @Mutation
  SETUP_POSTS(journalId: string) {
    Vue.set(this.allPosts, journalId, []);
  }

  @Mutation
  DELETE_ALL_POSTS(journalId: string) {
    delete this.allPosts[journalId];
  }

  @Mutation
  ADD_POST(postPayload: { journalId: string; post: JPost }) {
    const { journalId, post } = postPayload;
    this.allPosts[journalId].push(post);
  }

  @Mutation
  SET_JOURNAL_META(journal: JJournal) {
    this.journalMeta = journal;
  }

  get allPostInCurrentJournal() {
    if (!this.journalMeta?.id) {
      return [];
    }
    return this.allPosts[this.journalMeta.id];
  }

  @Action({ rawError: true })
  async createPost(post: JPost) {
    const tokens = await this.context.rootState.Auth.user.tokens;
    try {
      // const resp = await $axios.$post(
      //   "post",
      //   { ...post },
      //   { headers: { Authorization: tokens.accessToken } }
      // );
      // return resp;
      return tokens;
    } catch (err) {
      console.error("server error creating journal", err);
      return err;
    }
  }
}
