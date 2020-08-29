<template>
  <div>
    <div class="post" @click="showModal = true">
      {{ index }}
      <h1>{{ post.title }}</h1>
      <p>Date: {{ post.createdAt }}</p>
      <p>post ID : {{ post.postId }}</p>

      <button @click="$emit('delete-post', { index, postId: post.postId })">
        Delete Post
      </button>
    </div>

    <!-- TODO: Move Modal to seperate component -->
    <div v-if="showModal" class="modal-shadow">
      <button id="button-exit" @click="showModal = false">
        <ExitCross />
      </button>
      <div class="modal-container">
        <div class="modal-contents">
          <input v-model="updatedPost.title" type="text" />
          <br />
          <textarea v-model="updatedPost.contents" rows="10"></textarea>
          <p>Created on {{ post.createdAt }}</p>
          <p>post ID {{ post.postId }}</p>
          <br />
          <button @click="$emit('update-post', { updatedPost, index })">
            Save
          </button>
        </div>
      </div>
    </div>
    <!-- Modal end -->
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { JPost } from "@/types";
import ExitCross from "@/assets/images/exit-cross.svg?inline";

export default Vue.extend({
  components: {
    ExitCross
  },
  props: {
    post: {
      type: Object as PropType<JPost>,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data() {
    return new (class {
      updatedPost: JPost = {
        title: "",
        contents: "",
        createdAt: 0,
        tags: [],
        journalId: "",
        uid: "",
        postId: undefined,
        deleted: false
      };

      showModal = false;
    })();
  },
  mounted() {
    // Clone post object, so we dont mutate the prop
    this.updatedPost = { ...this.post };
  }
});
</script>

<style scoped>
.post {
  color: #2c3e50;
  box-shadow: 0px 0px 13px #7d7d7d;
  margin: 15px;
  padding: 20px;
  border-radius: 10px;
}

.modal-shadow {
  background-color: #3d3b3b5b;
  position: fixed;
  padding: 2em;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  z-index: 1;
}

.modal-shadow .modal-contents {
  max-height: 35rem;
  padding: 1rem;
  background-color: var(--app-secondary-background-color);
  box-shadow: 0px 0px 13px #7d7d7d;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  overflow-x: auto;
}

#button-exit {
  width: 40px;
  margin: 10px;
  float: right;
  background: none;
  fill: grey;
  border: none;
}

#button-exit:active {
  fill: black;
}
#button-exit:hover {
  fill: black;
}
</style>
