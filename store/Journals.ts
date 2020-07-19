import { Module, VuexModule, Action, Mutation } from "vuex-module-decorators";
import store from "vuex";
import { $axios } from "~/utils/api";
import { JJournal } from "@/types";

@Module({
  namespaced: true,
  stateFactory: true,
  store: store as any
})
export default class Journals extends VuexModule {
  journals: JJournal[] = [];

  @Mutation
  ADD_JOURNAL(journal: JJournal) {
    this.journals.push(journal);
  }

  get allJournals() {
    return this.journals;
  }

  @Action({ rawError: true })
  async createJournal(journal: JJournal) {
    const tokens = this.context.rootState.Auth.user.tokens;
    try {
      const resp = await $axios.$post(
        "journal",
        { ...journal },
        { headers: { Authorization: tokens.accessToken } }
      );
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
      // only retreive journals if there is nothing in state
      if (this.journals.length === 0) {
        const resp = await $axios.$get("journal", {
          headers: { Authorization: tokens.accessToken }
        });
        resp.forEach((journal: JJournal) => {
          this.context.commit("ADD_JOURNAL", journal);
        });
        return resp;
      } else {
        return [];
      }
    } catch (err) {
      console.error("error retrieving jounrnals", err);
      return err;
    }
  }

  @Action({ rawError: true })
  async deleteJournal(journalId: string) {
    const tokens = this.context.rootState.Auth.user.tokens;
    try {
      const resp = await $axios.$delete(`journal?id=${journalId}`, {
        headers: { Authorization: tokens.accessToken }
      });
      return resp;
    } catch (err) {
      console.error("error logging in", err);
      return err;
    }
  }

  @Action({ rawError: true })
  async updateJournal(journalTitleAndId: { journalTitle: string; id: string }) {
    const tokens = this.context.rootState.Auth.user.tokens;
    const { journalTitle, id } = journalTitleAndId;
    try {
      const resp = await $axios.$patch(
        `journal?id=${id}&title=${journalTitle}`,
        {},
        {
          headers: { Authorization: tokens.accessToken, test: "test" }
        }
      );
      return resp;
    } catch (err) {
      console.error("error logging in", err);
      return err;
    }
  }
}
