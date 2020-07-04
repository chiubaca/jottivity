import { Module, VuexModule, Action } from "vuex-module-decorators";
import store from "vuex";
import { $axios } from "~/utils/api";
import { JJournal, JToken } from "@/types";

@Module({
  namespaced: true,
  stateFactory: true,
  preserveState: false,
  store: store as any
})
export default class Auth extends VuexModule {
  journals: string[] = [];

  @Action({ rawError: true })
  async createJournal(journal: JJournal, tokens: JToken) {
    // console.log("Adding new journal...", journalName);

    try {
      const resp = await $axios.$post("create-journal", {
        ...journal,
        ...tokens
      });
      return resp;
    } catch (err) {
      console.error("error logging in", err);
      return err;
    }
  }
}
