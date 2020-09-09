<template>
  <div>
    <p>Mood</p>
    <div v-for="(tag, index) in tags.mood" :key="index">
      <input
        v-model="checkedTags"
        type="checkbox"
        :name="tag.name"
        :value="tag"
      />
      <label :for="tag.name">{{ tag.name }}</label>
    </div>
    <p>Activity</p>
    <div v-for="(tag, index) in tags.activity" :key="index">
      <input
        v-model="checkedTags"
        type="checkbox"
        :name="tag.name"
        :value="tag"
      />
      <label :for="tag.name">{{ tag.name }}</label>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { JTag } from "@/types";

export default Vue.extend({
  props: {
    tags: {
      type: Object as PropType<{ mood: JTag[]; activity: JTag[] }>,
      required: true
    }
  },
  data() {
    return {
      checkedTags: [] // Hold tags which are selected in the UI
    };
  },
  watch: {
    checkedTags() {
      this.$emit("checked-tags", this.checkedTags);
    }
  }
});
</script>

<style scoped></style>
