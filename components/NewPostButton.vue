<template>
  <div @keyup.esc="showModal = false">
    <button @click="showModal = true">{{ buttonText }}</button>
    <div v-if="showModal" class="modal-shadow">
      <div class="modal-container">
        <button id="button-exit" @click="showModal = false">
          <ExitCrossIcon />
        </button>
        <div class="modal-contents">
          <h1>How was your day?</h1>
          <input
            v-model="postTitle"
            type="text"
            placeholder="Summerise your day in sentence"
            @keyup.enter="emitPostAndCloseModal"
          />
          <br />
          <span v-if="emptyTitle">Your new post title cant be empty</span>
          <br />
          <textarea
            v-model="postContents"
            rows="10"
            placeholder="Write anything you want about your day here. It's to get it all out"
          ></textarea>
          <br />
          <button @click="emitPostAndCloseModal">
            Create
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { JPost } from "@/types";

export default Vue.extend({
  props: {
    buttonText: {
      type: String,
      required: true
    },
    journalId: {
      type: String,
      required: true
    },
    uid: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showModal: false,
      postTitle: "",
      postContents: "",
      tags: {},
      emptyTitle: false
    };
  },
  methods: {
    emitPostAndCloseModal() {
      if (this.postTitle === "") {
        this.emptyTitle = true;
        return;
      }

      const newPost: JPost = {
        title: this.postTitle,
        contents: this.postContents,
        tags: this.tags,
        createdAt: new Date().getTime(),
        journalId: this.journalId,
        uid: this.uid,
        postId: undefined,
        deleted: false
      };

      this.$emit("create-new-post", newPost);
      this.showModal = false;
      this.postTitle = "";
      this.postContents = "";
      this.emptyTitle = false;
    }
  }
});
</script>

<style scoped>
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
