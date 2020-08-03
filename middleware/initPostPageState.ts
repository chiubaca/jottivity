/**
 * Initialisation logic upon entering the Posts page. This ensure a namespace is present in the
 * Vuex Post state.
 */
import { Middleware } from "@nuxt/types";

const initPostPageState: Middleware = (context) => {
  const journalId = context.store.getters["Posts/currentJournalInfo"].id;
  const allUserPosts = context.store.getters["Posts/allPosts"];

  // If namespace for the journalId is not present in the post Vuex state, set this up.
  if (!allUserPosts[journalId]) {
    context.store.commit("Posts/SETUP_POSTS", journalId);
  }
};

export default initPostPageState;
