<template>
  <div>
    <h1>Your Posts | {{ currentJournal.name }}</h1>
    <p>journal ID: {{ currentJournal.journalId }}</p>
    <div class="fixed">
      <NewPostButton
        button-text="Add A New Post"
        @create-new-post="addNewPost($event)"
      />

      <div v-for="post in allPostInCurrentJournal">
        <PostCard :post="post" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import NewPostButton from "@/components/NewPostButton.vue";
import PostCard from "@/components/PostCard.vue";
import { Posts } from "@/store";

@Component({
  components: {
    NewPostButton,
    PostCard
  },
  middleware: ["journalInitialise"]
})
export default class AllPosts extends Vue {
  message = "Hello from class components";

  mounted() {
    console.log(
      "fetching posts",
      this.currentJournal?.uid,
      this.currentJournal?.journalId
    );

    Posts.getPostsInCurrentJournal({
      uid: this.currentJournal?.uid,
      journalid: this.currentJournal?.journalId
    });
  }

  get computedMessage() {
    return this.message + " plus some more text";
  }

  get allPostInCurrentJournal() {
    return Posts.allPostInCurrentJournal;
  }

  get currentJournal() {
    return Posts.currentJournal;
  }
}
</script>

<style scoped></style>
