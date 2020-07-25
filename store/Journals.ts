import { Module, VuexModule, Action, Mutation } from "vuex-module-decorators";
import store from "vuex";
import { $axios } from "~/utils/api";
import { JJournal } from "@/types";

type UpdateJournalEvent = {
  journalTitle: string;
  id: string;
  index: number;
};
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

  @Mutation
  UPDATE_JOURNAL(updateJournalEvnt: UpdateJournalEvent) {
    console.log(
      "Update Mutation",
      (this.journals[updateJournalEvnt.index].name =
        updateJournalEvnt.journalTitle)
    );
  }

  @Mutation
  DELETE_JOURNAL(journalIndex: number) {
    this.journals.splice(journalIndex, 1);
  }

  @Mutation
  REFRESH_JOURNAL_STATE(journals: JJournal[]) {
    this.journals = journals;
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
      console.error("server error creating journal", err);
      return err;
    }
  }

  @Action({ rawError: true })
  async getJournals() {
    const tokens = this.context.rootState.Auth.user.tokens;
    try {
      const resp = await $axios.$get("journal", {
        headers: { Authorization: tokens.accessToken }
      });

      this.context.commit("REFRESH_JOURNAL_STATE", resp);

      return resp;
    } catch (err) {
      console.error("error retrieving jounrnals", err);
      return err;
    }
  }

  @Action({ rawError: true })
  async deleteJournal(delJournalEvnt: { index: number; id: string }) {
    const { index, id } = delJournalEvnt;
    const tokens = this.context.rootState.Auth.user.tokens;
    this.context.commit("DELETE_JOURNAL", index);
    try {
      const resp = await $axios.$delete(`journal?id=${id}`, {
        headers: { Authorization: tokens.accessToken }
      });
      return resp;
    } catch (err) {
      console.error("error logging in", err);
      return err;
    }
  }

  @Action({ rawError: true })
  async updateJournal(updateJournalEvnt: UpdateJournalEvent) {
    const tokens = this.context.rootState.Auth.user.tokens;
    const { journalTitle, id } = updateJournalEvnt;
    try {
      const resp = await $axios.$patch(
        `journal?id=${id}&title=${journalTitle}`,
        {},
        { headers: { Authorization: tokens.accessToken, test: "test" } }
      );
      this.context.commit("UPDATE_JOURNAL", updateJournalEvnt);
      return resp;
    } catch (err) {
      console.error("error logging in", err);
      return err;
    }
  }
}
