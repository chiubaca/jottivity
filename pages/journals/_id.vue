<template>
  <div>
    <h1>Your Posts | {{ currentJournal.name }}</h1>
    <p>journal ID: {{ currentJournal.id }}</p>
    <div class="fixed">
      <NewPostButton
        button-text="Add A New Post"
        @create-new-post="addNewPost($event)"
      />

      <div v-for="post in allPostInCurrentJournal">
        {{ post }}
      </div>
    </div>
    <p>Testing class components</p>
    <p>{{ message }}</p>
    <p>{{ computedMessage }}</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import NewPostButton from "@/components/NewPostButton.vue";
import { Posts } from "@/store";

@Component({
  components: {
    NewPostButton
  },
  middleware: ["journalInitialise"]
})
export default class AllPosts extends Vue {
  message = "Hello from class components";

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
