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

  // TODO: Is there a better data structure than a flat array for this?
  @Mutation
  REFRESH_POST_STATE(posts: JPost[]) {
    this._posts = posts;
  }

  @Mutation
  HIDE_POST(index: number) {
    this._posts[index].hidden = true;
  }

  get currentJournal() {
    return this._currentJournal;
  }

  get allPosts() {
    return this._posts;
  }

  get allPostInCurrentJournal() {
    return this._posts.filter(
      (post) => post.journalId === this._currentJournal?.journalId
    );
  }

  get currentJournalInfo() {
    return this._currentJournal;
  }

  @Action({ rawError: true })
  async getPostsInCurrentJournal(getPostsEvnt: {
    // TODO Review these types, might be too loose
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
      // all post in current journal are not hidden by default
      this.context.commit(
        "REFRESH_POST_STATE",
        resp.map((post: JPost) => {
          post.hidden = false;
          return post;
        })
      );

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
      // set the post to be visible
      post.hidden = false;
      this.context.commit("ADD_POST", post);
      return resp;
    } catch (err) {
      console.error("server error creating journal", err);
      return err;
    }
  }

  @Action({ rawError: true })
  async deletePost(delEvtPayload: { index: number; postId: string }) {
    const tokens = await Auth.user?.tokens;
    const { index, postId } = delEvtPayload;
    try {
      const resp = await $axios.$delete("post", {
        headers: { Authorization: tokens?.accessToken },
        params: { postId }
      });
      console.log("vuex deleting post...", postId, index);
      this.context.commit("HIDE_POST", index);
      return resp;
    } catch (err) {
      console.error("server error deleting post", err);
      return err;
    }
  }
}
