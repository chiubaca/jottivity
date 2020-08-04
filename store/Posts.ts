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
  posts: JAllPosts = {};

  journalMeta: JJournal | undefined = undefined;

  @Mutation
  SETUP_POSTS(journalId: string) {
    Vue.set(this.posts, journalId, []);
  }

  @Mutation
  DELETE_ALL_POSTS(journalId: string) {
    delete this.posts[journalId];
  }

  @Mutation
  ADD_POST(postPayload: { journalId: string; post: JPost }) {
    const { journalId, post } = postPayload;

    // create the Journal namespace for the posts if its not there yet.
    if (!this.posts[journalId]) {
      Vue.set(this.posts, journalId, []);
      this.posts[journalId].push(post);
    }
    this.posts[journalId].push(post);
  }

  @Mutation
  SET_JOURNAL_META(journal: JJournal) {
    this.journalMeta = journal;
  }

  get allPosts() {
    return this.posts;
  }

  get allPostInCurrentJournal() {
    if (!this.journalMeta?.id) {
      return [];
    }
    return this.posts[this.journalMeta.id];
  }

  get currentJournalInfo() {
    return this.journalMeta;
  }

  // @Action({ rawError: true })
  // async createPost(post: JPost) {
  //   const tokens = await this.context.rootState.Auth.user.tokens;
  //   try {
  //     // const resp = await $axios.$post(
  //     //   "post",
  //     //   { ...post },
  //     //   { headers: { Authorization: tokens.accessToken } }
  //     // );
  //     // return resp;
  //     return tokens;
  //   } catch (err) {
  //     console.error("server error creating journal", err);
  //     return err;
  //   }
  // }
}
