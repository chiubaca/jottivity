<template>
  <div class="journal">
    {{ index }}
    <input
      ref="editTitle"
      v-model="journalTitle"
      readonly
      type="text"
      @keyup.enter="$emit('update', { journalTitle, id: journal.id, index })"
      @click="toggleEditMode"
    />
    <h2>Created on {{ new Date(journal.createdAt).toDateString() }}</h2>
    <h3>Journal ID {{ journal.id }}</h3>
    <button @click="$emit('delete', { index, id: journal.id })">
      Delete Journal
    </button>
    <button @click="openJournal">Open Journal</button>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";

import { JJournal } from "../types";
export default Vue.extend({
  props: {
    index: {
      type: Number,
      required: true
    },
    journal: {
      type: Object,
      required: true
    } as PropOptions<JJournal>
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
      this.$router.push({ path: `/journals/${this.journal.id}` });
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
