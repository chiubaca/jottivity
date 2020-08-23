import { Module, VuexModule, Action, Mutation } from "vuex-module-decorators";
import store from "vuex";
import { Auth } from "@/store";
import { JJournal } from "@/types";
import { $axios } from "@/utils/api";

type UpdateJournalEvent = {
  journalTitle: string;
  journalId: string;
  index: number;
};
@Module({
  name: "Journal",
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
    const tokens = Auth.user?.tokens;
    try {
      const resp: JJournal = await $axios.$post(
        "journal",
        { ...journal },
        { headers: { Authorization: tokens?.accessToken } }
      );
      return resp;
    } catch (err) {
      console.error("server error creating journal", err);
      return err;
    }
  }

  @Action({ rawError: true })
  async getJournals() {
    const tokens = Auth.user?.tokens;
    try {
      const resp = await $axios.$get("journal", {
        headers: { Authorization: tokens?.accessToken }
      });

      this.context.commit("REFRESH_JOURNAL_STATE", resp);

      return resp;
    } catch (err) {
      console.error("error retrieving journals", err);
      return err;
    }
  }

  @Action({ rawError: true })
  async deleteJournal(delJournalEvnt: { index: number; journalId: string }) {
    const { index, journalId } = delJournalEvnt;
    const tokens = Auth.user?.tokens;
    this.context.commit("DELETE_JOURNAL", index);
    this.context.commit("Posts/DELETE_ALL_POSTS", journalId, { root: true });
    try {
      const resp = await $axios.$delete(`journal`, {
        headers: { Authorization: tokens?.accessToken },
        params: { journalId }
      });
      return resp;
    } catch (err) {
      console.error("error deleting journal", err);
      return err;
    }
  }

  @Action({ rawError: true })
  async updateJournal(updateJournalEvnt: UpdateJournalEvent) {
    const tokens = Auth.user?.tokens;
    const { journalTitle, journalId } = updateJournalEvnt;
    try {
      const resp = await $axios.$patch(
        `journal`,
        {},
        {
          headers: { Authorization: tokens?.accessToken },
          params: {
            title: journalTitle,
            journalId
          }
        }
      );
      this.context.commit("UPDATE_JOURNAL", updateJournalEvnt);
      return resp;
    } catch (err) {
      console.error("error logging in", err);
      return err;
    }
  }
}
