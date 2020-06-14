<template>
  <div>
    <h1>randomText</h1>
    <div>
      <span>Some text: {{ randomText }}</span>
      <br />
      <span>Wheels: {{ wheelNum }}</span>
    </div>
    <button @click="incrWheels(2)">Increase wheels</button>
    <button @click="useAction('lalalalal')">
      update text with lalalal
    </button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default Vue.extend({
  data() {
    return {
      text: "THIS IS SOME TEXT FROM VUE DATA"
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
    useAction(textToUpdate: string) {
      console.log("Action Time!", textToUpdate);
      this.updateTextAction(textToUpdate);
    }
  }
});
</script>

<style scoped></style>
