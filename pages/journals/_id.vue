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

      <PostCard
        v-for="(post, index) in allPostInCurrentJournal"
        :key="index"
        :post="post"
        :index="index"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import NewPostButton from "@/components/NewPostButton.vue";
import PostCard from "@/components/PostCard.vue";
import { Posts } from "@/store";
import { JPost } from "@/types";

@Component({
  components: {
    NewPostButton,
    PostCard
  },
  middleware: ["journalInitialise"]
})
export default class AllPosts extends Vue {
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

  get allPostInCurrentJournal() {
    return Posts.allPostInCurrentJournal;
  }

  get currentJournal() {
    return Posts.currentJournal;
  }

  addNewPost(post: JPost) {
    console.log("dispatching action");
    Posts.createPost(post);
  }
}
</script>

<style scoped></style>
