<template>
  <div>
    <h1>Your Posts | {{ journalMeta.name }}</h1>
    <p>journal ID: {{ journalMeta.id }}</p>
    <div class="fixed">
      <NewPostButton
        button-text="Add A New Post"
        @create="addNewPost($event)"
      />

      <div v-for="(post, index) in allPostInCurrentJournal">
        {{ post }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations, mapState, mapGetters } from "vuex";
import NewPostButton from "@/components/NewPostButton.vue";

export default Vue.extend({
  middleware: "setJournalState",
  components: {
    NewPostButton
  },
  methods: {
    ...mapMutations("Posts", ["ADD_POST"]),
    addNewPost(newPost: unknown) {
      console.log("Adding new Post", newPost);
      this.ADD_POST({ journalId: this.journalMeta.id, post: newPost });
    }
  },
  computed: {
    ...mapState("Posts", ["journalMeta"]),
    ...mapGetters("Posts", ["allPostInCurrentJournal"])
  }
});
</script>

<style scoped></style>
