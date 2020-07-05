<template>
  <div class="journals container--center">
    <h1>Your Journals</h1>
    <div class="new-notebook">
      <textarea
        id="new-notebook-name"
        v-model="newJournalName"
        placeholder="Notebook Name"
      ></textarea>
      <button @click="addNewJournal">+ New Notebook</button>
    </div>

    <Journal
      v-for="journal in journals"
      :key="journal.createdAt"
      :journal="journal"
    />

    <button @click="getJournals">Get journals</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapState } from "vuex";
import { JJournal } from "../types";
import Journal from "@/components/Journal.vue";
export default Vue.extend({
  middleware: "authenticated",
  components: {
    Journal
  },
  data() {
    return {
      newJournalName: "",
      journals: []
    };
  },
  computed: mapState("Auth", ["user"]),
  async beforeMount() {
    const journals = await this.getJournals();
    console.log(journals);
    this.journals = journals;
  },
  methods: {
    ...mapActions("Journals", ["createJournal", "getJournals"]),
    addNewJournal() {
      const journal: JJournal = {
        name: this.newJournalName,
        uid: this.user.uid,
        createdAt: new Date().getTime()
      };

      this.createJournal(journal);
    }
  }
});
</script>

<style scoped>
.journals {
  display: flex;
  flex-direction: column;
}
.new-notebook {
  color: #2c3e50;
  box-shadow: 0px 0px 13px #7d7d7d;
  width: 200px;
  margin: 15px;
  padding: 20px;
  border-radius: 10px;
}
</style>
