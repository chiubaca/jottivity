<template>
  <div>
    <h1>Your Posts | {{journalMeta.name}}</h1>
    <div class="fixed">
      <NewPostButton
        button-text="Add A New Post"
        @create="addNewPost($event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapMutations, mapState } from "vuex";
import NewPostButton from "@/components/NewPostButton.vue";

export default Vue.extend({
  middleware: "setJournalState",
  components: {
    NewPostButton
  },
  methods: {
    ...mapMutations("posts", ["ADD_POST"]),
    addNewPost(newPost: unknown) {
      console.log("Adding new Post", newPost);
    }
  },
  computed:{
    ...mapState("Posts", ["journalMeta"])
  }
});
</script>

<style scoped></style>
