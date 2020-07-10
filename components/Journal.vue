<template>
  <div class="journal">
    <h1>{{ journal.name }}</h1>
    <h2>{{ journal.createdAt }}</h2>
    <button @click="$emit('delete', journal.id)">Delete Journal</button>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";

import { JJournal } from "../types";
export default Vue.extend({
  props: {
    journal: {
      type: Object,
      required: true
    } as PropOptions<JJournal>
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
