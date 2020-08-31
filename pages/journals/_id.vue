<template>
  <div>
    <h1>Your Posts | {{ currentJournal.name }}</h1>
    <p>journal ID: {{ currentJournal.journalId }}</p>
    <div class="fixed">
      <NewPostButton
        button-text="Add A New Post"
        :journal-id="currentJournal.journalId"
        :uid="currentJournal.uid"
        @create-new-post="addNewPost($event)"
      />

      <div
        v-for="(post, index) in allPostInCurrentJournal"
        :key="index"
        class="postcard-container"
      >
        <PostCard
          v-if="!post.deleted"
          :post="post"
          :index="index"
          @delete-post="deletePost($event)"
          @update-post="updatePost($event)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import NewPostButton from "@/components/NewPostButton.vue";
import { Posts } from "@/store";
import { JPost } from "@/types";

export default Vue.extend({
  middleware: ["journalInitialise"],
  computed: {
    allPostInCurrentJournal() {
      return Posts.allPostInCurrentJournal;
    },

    currentJournal() {
      return Posts.currentJournal;
    }
  },
  mounted() {
    // Fetch posts
    Posts.getPostsInCurrentJournal({
      uid: this.currentJournal?.uid,
      journalid: this.currentJournal?.journalId
    });
  },
  methods: {
    addNewPost(post: JPost) {
      console.log("dispatching action");
      Posts.createPost(post);
    },

    deletePost(delEvtPayload: { index: number; postId: string }) {
      console.log("component dispatching delete", delEvtPayload);
      Posts.deletePost(delEvtPayload);
    },

    updatePost(updateEvtPayload: { index: number; updatedPost: JPost }) {
      console.log("dispatchig update post action", updateEvtPayload);
      Posts.updatePost(updateEvtPayload);
    }
  }
});
</script>

<style scoped></style>
