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
      v-for="(journal, index) in allJournals"
      :key="journal.id"
      :journal="journal"
      :index="index"
      @delete="deleteJournal($event)"
      @update="updateJournal($event, journal)"
    />

    <button @click="getJournals">Get journals</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
import { JJournal } from "../types";
import Journal from "@/components/Journal.vue";
export default Vue.extend({
  middleware: "authenticated",
  components: {
    Journal
  },
  data() {
    return {
      newJournalName: ""
    };
  },
  computed: {
    ...mapState("Auth", ["user"]),
    ...mapGetters("Journals", ["allJournals"])
  },
  async mounted() {
    try {
      await this.getJournals();
    } catch (err) {
      console.error("Failed to get journals", err);
      alert("Sorry there was problem getting your journals");
    }
  },
  methods: {
    ...mapMutations("Journals", ["ADD_JOURNAL"]),
    ...mapActions("Journals", [
      "createJournal",
      "getJournals",
      "deleteJournal",
      "updateJournal"
    ]),
    async addNewJournal() {
      try {
        const journal: JJournal = {
          name: this.newJournalName,
          uid: this.user.uid,
          createdAt: new Date().getTime(),
          id: undefined
        };

        const newJournal = await this.createJournal(journal);

        if (newJournal.error) {
          alert("Please sign in again");
          this.$router.push("login");
          return;
        }

        this.ADD_JOURNAL(newJournal);
        console.log("created new Journal", newJournal);
      } catch (error) {
        alert("there was problem creating the journal");
      }
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
