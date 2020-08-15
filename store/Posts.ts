import Vue from "vue";
import { Module, VuexModule, Action, Mutation } from "vuex-module-decorators";
import store from "vuex";
import { JPost, JJournal } from "@/types";
// import { $axios } from "~/utils/api";

@Module({
  namespaced: true,
  stateFactory: true,
  store: store as any
})
export default class Posts extends VuexModule {
  _posts: JPost[] = [];

  _currentJournal: JJournal | undefined = undefined;

  @Mutation
  DELETE_ALL_POSTS(journalId: string) {
    // This needs to filter all elements by journalid then delete it from this._posts
    // https://stackoverflow.com/questions/37385299/filter-and-delete-filtered-elements-in-an-array
    return journalId;
  }

  @Mutation
  ADD_POST(postPayload: JPost) {
    this._posts.push(postPayload);
  }

  @Mutation
  SET_JOURNAL_META(journal: JJournal) {
    this._currentJournal = journal;
  }

  get currentJournal() {
    return this._currentJournal;
  }

  get allPosts() {
    return this._posts;
  }

  get allPostInCurrentJournal() {
    if (!this._currentJournal?.journalId) {
      return [];
    }
    return this._posts.filter(
      (post) => post.journalId === this._currentJournal?.journalId
    );
  }

  get currentJournalInfo() {
    return this._currentJournal;
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
