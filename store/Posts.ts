// import Vue from "vue";
import { Module, VuexModule, Action, Mutation } from "vuex-module-decorators";
import store from "vuex";
import { Auth } from "@/store";
import { JPost, JJournal } from "@/types";
import { $axios } from "@/utils/api";

@Module({
  name: "Posts",
  namespaced: true,
  stateFactory: true,
  store: store as any
})
export default class PostStore extends VuexModule {
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

  @Mutation
  REFRESH_POST_STATE(posts: JPost[]) {
    this._posts = posts;
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

  @Action({ rawError: true })
  async getPostsInCurrentJournal(getPostsEvnt: {
    // TODO Review these types, might be too looses
    uid: string | undefined;
    journalid: string | undefined;
  }) {
    const { uid, journalid } = getPostsEvnt;

    const tokens = this.context.rootState.Auth._user.tokens;
    try {
      const resp = await $axios.$get("post", {
        headers: { Authorization: tokens.accessToken },
        params: {
          uid,
          journalid
        }
      });

      // try using Posts.REFRESH_POST_STATE
      this.context.commit("REFRESH_POST_STATE", resp);

      return resp;
    } catch (err) {
      console.error("error retrieving journals", err);
      return err;
    }
  }

  @Action({ rawError: true })
  async createPost(post: JPost) {
    const tokens = await Auth.user?.tokens;

    try {
      const resp = await $axios.$post(
        "post",
        { ...post },
        { headers: { Authorization: tokens?.accessToken } }
      );
      console.log("Action added new post", post);
      return resp;
    } catch (err) {
      console.error("server error creating journal", err);
      return err;
    }
  }
}
