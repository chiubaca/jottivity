import { Module, VuexModule, Action, Mutation } from "vuex-module-decorators";
import store from "vuex";
import { Auth, Tags } from "@/store";
import { JTag } from "@/types";
import { $axios } from "@/utils/api";

@Module({
  name: "Tags",
  namespaced: true,
  stateFactory: true,
  store: store as any
})
export default class TagStore extends VuexModule {
  _tags: JTag[] = [];

  get allTagsInCurrentJournal() {
    return this._tags;
  }

  @Mutation
  REFRESH_TAG_STATE(tags: JTag[]) {
    this._tags = tags;
  }

  @Action({ rawError: true })
  async getAvailableTagsInCurrentJournal(getTagsEvnt: {
    uid: string | undefined;
    journalid: string | undefined;
  }) {
    const { uid, journalid } = getTagsEvnt;
    console.log("getting tags", getTagsEvnt);

    const tokens = Auth.user?.tokens;

    try {
      const resp = await $axios.$get("tag", {
        headers: { Authorization: tokens?.accessToken },
        params: {
          uid,
          journalid
        }
      });
      console.log("got tags", resp);
      Tags.REFRESH_TAG_STATE(resp);
      return resp;
    } catch (err) {
      console.error("error retrieving journals", err);
      return err;
    }
  }
}
