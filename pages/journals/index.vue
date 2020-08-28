<template>
  <div>
    <h1>Your Journals</h1>

    <div v-for="(journal, index) in allJournals">
      <JournalCard
        v-if="!journal.deleted"
        :key="index"
        :journal="journal"
        :index="index"
        @delete-journal="deleteJournal($event)"
        @update-journal="updateJournal($event, journal)"
      />
    </div>
    <div class="fixed">
      <NewJournalButton
        button-text="Create a new Journal"
        @create-journal="addNewJournal($event)"
      />
    </div>

    <button @click="getJournals">Sync Journals</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { JJournal } from "@/types";
import JournalCard from "@/components/JournalCard.vue";
import NewJournalButton from "@/components/NewJournalButton.vue";
export default Vue.extend({
  middleware: "authenticated",
  components: {
    JournalCard,
    NewJournalButton
  },
  data() {
    return {
      newJournalName: ""
    };
  },
  computed: {
    ...mapGetters("Auth", ["user"]),
    ...mapGetters("Journals", ["allJournals"])
  },
  async mounted() {
    try {
      const resp = await this.getJournals();

      // Handle Token timeout
      // TODO make handling error more DRY. Consier renewing token on app start?
      if (resp.error) {
        alert("Please sign in again");
        this.$router.push("login");
        return;
      }
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
    async addNewJournal(journalTitle: string) {
      try {
        const journal: JJournal = {
          name: journalTitle,
          uid: this.user.uid,
          createdAt: new Date().getTime(),
          journalId: undefined,
          deleted: false
        };
        const newJournal = await this.createJournal(journal);

        if (newJournal.error) {
          alert("Please sign in again");
          this.$router.push("login");
          return;
        }

        this.ADD_JOURNAL(newJournal);
      } catch (error) {
        console.error("there was problem creating the journal", error);
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

.fixed {
  position: fixed;
  right: 15px;
  bottom: 15px;
}
</style>
