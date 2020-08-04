<template>
  <div @keyup.esc="showModal = false">
    <button @click="showModal = true">{{ buttonText }}</button>
    <div v-if="showModal" class="modal-shadow">
      <div class="modal-container">
        <button id="button-exit" @click="showModal = false">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              d="M256 512C114.839844 512 0 397.160156 0 256S114.839844 0 256 0s256 114.839844 256 256-114.839844 256-256 256zm0-475.429688c-120.992188 0-219.429688 98.4375-219.429688 219.429688S135.007812 475.429688 256 475.429688 475.429688 376.992188 475.429688 256 376.992188 36.570312 256 36.570312zm0 0"
            />
            <path
              d="M347.429688 365.714844c-4.679688 0-9.359376-1.785156-12.929688-5.359375L151.644531 177.5c-7.144531-7.144531-7.144531-18.714844 0-25.855469 7.140625-7.140625 18.714844-7.144531 25.855469 0L360.355469 334.5c7.144531 7.144531 7.144531 18.714844 0 25.855469-3.570313 3.574219-8.246094 5.359375-12.925781 5.359375zm0 0"
            />
            <path
              d="M164.570312 365.714844c-4.679687 0-9.355468-1.785156-12.925781-5.359375-7.144531-7.140625-7.144531-18.714844 0-25.855469L334.5 151.644531c7.144531-7.144531 18.714844-7.144531 25.855469 0 7.140625 7.140625 7.144531 18.714844 0 25.855469L177.5 360.355469c-3.570312 3.574219-8.25 5.359375-12.929688 5.359375zm0 0"
            />
          </svg>
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
        journalId: this.$store.getters["Posts/currentJournalInfo"].id,
        uid: this.$store.getters["Posts/currentJournalInfo"].uid
      };

      this.$emit("create-new-post", newPost);
      this.showModal = false;
      this.postTitle = "";
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
