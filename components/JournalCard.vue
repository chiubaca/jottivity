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
    <h2>{{ journal.createdAt }}</h2>
    <button @click="$emit('delete', { index, id: journal.id })">
      Delete Journal
    </button>
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
    }
  }
});
</script>

<style scoped>
.journal {
  color: #2c3e50;
  box-shadow: 0px 0px 13px #7d7d7d;
  width: 200px;
  margin: 15px;
  padding: 20px;
  border-radius: 10px;
}
</style>
