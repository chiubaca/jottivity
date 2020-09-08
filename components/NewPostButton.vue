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
            v-model="newPost.postTitle"
            type="text"
            placeholder="Summerise your day in sentence"
            @keyup.enter="emitPostAndCloseModal"
          />
          <br />
          <span v-if="emptyTitle">Your new post title cant be empty</span>
          <br />
          <textarea
            v-model="newPost.postContents"
            rows="10"
            placeholder="Write anything you want about your day here. It's to get it all out"
          ></textarea>
          <br />
          <h2>Tags</h2>
          <!-- Tag and Tag container components  to be created -->
          <h3>Mood</h3>
          <div v-for="(tag, index) in groupedTags.mood" :key="index">
            <input
              v-model="checkedTags"
              type="checkbox"
              class="activity-tags"
              :name="tag.name"
              :value="tag"
            />
            <label :for="tag.name">{{ tag.name }}</label>
          </div>

          <h3>Activity</h3>
          <div v-for="(tag, index) in groupedTags.activity" :key="index">
            <input
              v-model="checkedTags"
              type="checkbox"
              class="activity-tags"
              :name="tag.name"
              :value="tag"
            />
            <label :for="tag.name">{{ tag.name }}</label>
          </div>

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
import { Tags } from "@/store";
import { JPost, JTag } from "@/types";

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
  data(): {
    tags: JTag[];
    checkedTags: JTag[];
    newPost: {
      postTitle: string;
      postContents: string;
    };
    emptyTitle: boolean;
    showModal: boolean;
  } {
    return {
      tags: [], // Tags for store is saved here
      checkedTags: [], // Hold tags which are selected in the UI
      newPost: {
        postTitle: "",
        postContents: ""
      },
      emptyTitle: false,
      showModal: false
    };
  },
  computed: {
    groupedTags(): { mood: JTag[]; activity: JTag[] } {
      const moodTags = this.tags.filter((tag: JTag) => tag.category === "mood");
      const activityTags = this.tags.filter(
        (tag: JTag) => tag.category === "activity"
      );
      return { mood: moodTags, activity: activityTags };
    }
  },
  mounted() {
    // Clone available tags for this journal so they be used to tag new post
    this.tags = Tags.allTagsInCurrentJournal;
  },
  methods: {
    emitPostAndCloseModal() {
      if (this.newPost.postTitle === "") {
        this.emptyTitle = true;
        return;
      }

      const newPost: JPost = {
        title: this.newPost.postTitle,
        contents: this.newPost.postContents,
        tags: this.checkedTags,
        createdAt: new Date().getTime(),
        journalId: this.journalId,
        uid: this.uid,
        postId: undefined,
        deleted: false
      };

      this.$emit("create-new-post", newPost);
      this.showModal = false;
      this.newPost.postTitle = "";
      this.newPost.postContents = "";
      this.emptyTitle = false;
      this.checkedTags = [];
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
