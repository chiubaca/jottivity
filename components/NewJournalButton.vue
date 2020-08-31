<template>
  <div @keyup.esc="showModal = false">
    <button @click="showModal = true">{{ buttonText }}</button>
    <div v-if="showModal" class="modal-shadow">
      <div class="modal-container">
        <button id="button-exit" @click="showModal = false">
          <ExitCrossIcon />
        </button>
        <div class="modal-contents">
          <h1>New Journal Name</h1>
          <input
            v-model="journalTitle"
            type="text"
            placeholder="New Journal"
            @keyup.enter="emitJournalTitleAndCloseModal"
          />
          <button @click="emitJournalTitleAndCloseModal">
            Create
          </button>
          <br />
          <span v-if="emptyTitle">Your new journal title cant be empty</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

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
      journalTitle: "",
      emptyTitle: false
    };
  },

  methods: {
    emitJournalTitleAndCloseModal() {
      if (this.journalTitle === "") {
        this.emptyTitle = true;
        return;
      }

      this.$emit("create-journal", this.journalTitle);
      this.showModal = false;
      this.journalTitle = "";
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
