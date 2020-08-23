<template>
  <div class="journal">
    {{ index }}
    <input
      ref="editTitle"
      v-model="journalTitle"
      readonly
      type="text"
      @keyup.enter="
        $emit('update-journal', { journalTitle, journalIdId: journal.journalId, index })
      "
      @click="toggleEditMode"
    />
    <h2>Created on {{ new Date(journal.createdAt).toDateString() }}</h2>
    <h3>Journal ID {{ journal.journalId }}</h3>
    <button @click="$emit('delete-journal', { index, id: journal.journalId })">
      Delete Journal
    </button>
    <button @click="openJournal">Open Journal</button>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";

import { JJournal } from "../types";
export default Vue.extend({
  props: {
    index: {
      type: Number,
      required: true
    },
    journal: {
      type: Object as PropType<JJournal>,
      required: true
    }
  },
  data() {
    return {
      editMode: false,
      journalTitle: ""
    };
  },
  mounted() {
    this.journalTitle = this.journal.name;
  },
  methods: {
    toggleEditMode() {
      this.editMode = !this.editMode;
      if (this.editMode) {
        (this.$refs.editTitle as HTMLInputElement).removeAttribute("readonly");
      }
    },
    openJournal() {
      this.$router.push({ path: `/journals/${this.journal.journalId}` });
    }
  }
});
</script>

<style scoped>
.journal {
  color: #2c3e50;
  box-shadow: 0px 0px 13px #7d7d7d;
  margin: 15px;
  padding: 20px;
  border-radius: 10px;
}
</style>
