<template>
  <div>
    <h1>Your Posts | {{ currentJournal.name }}</h1>
    <p>journal ID: {{ currentJournal.id }}</p>
    <div class="fixed">
      <NewPostButton
        button-text="Add A New Post"
        @create-new-post="addNewPost($event)"
      />

      <div v-for="(post, index) in allPostInCurrentJournal">
        {{ post }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations, mapGetters } from "vuex";
import NewPostButton from "@/components/NewPostButton.vue";

export default Vue.extend({
  middleware: ["journalInitialise"],
  components: {
    NewPostButton
  },
  computed: {
    ...mapGetters("Posts", ["allPostInCurrentJournal", "currentJournal"])
  },
  methods: {
    ...mapMutations("Posts", ["ADD_POST"]),
    addNewPost(newPost: unknown) {
      this.ADD_POST(newPost);
    }
  }
});
</script>

<style scoped></style>
