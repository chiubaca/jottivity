import Vue from "vue";
import { Module, VuexModule, Action, Mutation } from "vuex-module-decorators";
import store from "vuex";
import { Auth, Posts } from "@/store";
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
  UPDATE_POST(updateEvtPayload: { index: number; updatedPost: JPost }) {
    Vue.set(this._posts, updateEvtPayload.index, updateEvtPayload.updatedPost);
  }

  // TODO: Is there a better data structure than a flat array for this?
  @Mutation
  REFRESH_POST_STATE(posts: JPost[]) {
    this._posts = posts;
  }

  @Mutation
  HIDE_POST(index: number) {
    this._posts[index].deleted = true;
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

    // TODO - type check for undefined and handle it
    const tokens = Auth.user?.tokens;
    try {
      const resp = await $axios.$get("post", {
        headers: { Authorization: tokens?.accessToken },
        params: {
          uid,
          journalid
        }
      });

      Posts.REFRESH_POST_STATE(resp);
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
      console.log("Action added new post", resp);
      alert("new post added");
      // set the post to be visible
      post.deleted = false;
      Posts.ADD_POST(resp);
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
      Posts.HIDE_POST(index);
      return resp;
    } catch (err) {
      console.error("server error deleting post", err);
      return err;
    }
  }

  @Action({ rawError: true })
  async updatePost(updateEvtPayload: { index: number; updatedPost: JPost }) {
    const tokens = await Auth.user?.tokens;
    try {
      const resp = await $axios.$patch(
        "post",
        { ...updateEvtPayload.updatedPost },
        {
          headers: { Authorization: tokens?.accessToken }
        }
      );
      if (resp.error) {
        throw new Error("error");
      }
      Posts.UPDATE_POST(updateEvtPayload);
      console.log("vuex updated post...", resp);

      alert("updated post");
      return resp;
    } catch (err) {
      console.error("server error updating  post", err);
      alert("error updating post");
      return err;
    }
  }
}
