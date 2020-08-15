/**
 * Check if journal ID exists.
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

  // If no journal could be found redirect back to journals page
  if (currentJournal === undefined) {
    console.error("Journal does not exits, redirecting back to journals page")
    context.redirect({ path: "/journals/" });
  }

  context.store.commit("Posts/SET_JOURNAL_META", currentJournal);
};

export default setJournalState;
