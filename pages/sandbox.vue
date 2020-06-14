<template>
  <div>
    <h1>randomText</h1>
    <div>
      <span>Some text: {{ randomText }}</span>
      <br />
      <span>Wheels: {{ wheelNum }}</span>
    </div>
    <button @click="incrWheels(5)">Increase wheels</button>
    <button @click="useUpdateTextAction">
      udpate text
    </button>
    <input v-model="text" type="text" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default Vue.extend({
  data() {
    return {
      text: ""
    };
  },
  computed: {
    ...mapGetters("TestModule", ["wheelNum", "randomText"])
  },
  mounted() {
    console.log("mounted sandbox");
  },
  methods: {
    ...mapMutations("TestModule", ["incrWheels"]),
    ...mapActions("TestModule", ["updateTextAction"]),
    useUpdateTextAction() {
      this.updateTextAction(this.text);
    }
  }
});
</script>

<style scoped></style>
