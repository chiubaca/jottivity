/**
 * Centralise the journal meta info into Vuex for easy access.
 * This should be used in the _id Journal sub route.
 */

import { Middleware } from "@nuxt/types";
import { JJournal } from "@/types";

const setJournalState: Middleware = (context) => {
  const journalId = context.route.params.id;
  const allJournals = context.store.getters["Journals/allJournals"];

  // find journal info from journal state
  const currentJournal = allJournals.find(
    (journal: JJournal) => journal.id === journalId
  );

  context.store.commit("Posts/SET_JOURNAL_META", currentJournal);
};

export default setJournalState;
