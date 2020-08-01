<template>
  <div>
    <h1>Your Posts</h1>
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
import NewPostButton from "@/components/NewPostButton.vue";

export default Vue.extend({
  components: {
    NewPostButton
  },
  methods: {
    addNewPost(newPost: unknown) {
      console.log("Adding new Post", newPost);
    }
  }
});
</script>

<style scoped></style>
