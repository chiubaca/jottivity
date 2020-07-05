import { Module, VuexModule, Action } from "vuex-module-decorators";
import store from "vuex";
import { $axios } from "~/utils/api";
import { JJournal } from "@/types";

@Module({
  namespaced: true,
  stateFactory: true,
  preserveState: false,
  store: store as any
})
export default class Journals extends VuexModule {
  journals: string[] = [];

  @Action({ rawError: true })
  async createJournal(journal: JJournal) {
    try {
      const resp = await $axios.$post("create-journal", {
        ...journal
      });
      return resp;
    } catch (err) {
      console.error("error logging in", err);
      return err;
    }
  }

  @Action({ rawError: true })
  async getJournals() {
    const tokens = this.context.rootState.Auth.user.tokens;
    try {
      const resp = await $axios.$get("get-journals", {
        headers: {
          Authorization: tokens.accessToken
        }
      });
      return resp;
    } catch (err) {
      console.error("error logging in", err);
      return err;
    }
  }
}
