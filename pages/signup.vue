<template>
  <div id="signup">
    <div class="container--center signup-form">
      <h1>👋 Hello there, Signup!</h1>
      <form @submit.prevent="useEmailSignup">
        <div class="input">
          <label for="age">Your Name</label>
          <input
            id="name"
            v-model.number="registrationDetails.name"
            type="text"
          />
        </div>
        <div class="input">
          <label for="email">Email</label>
          <input id="email" v-model="registrationDetails.email" type="email" />
        </div>
        <div class="input">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="registrationDetails.password"
            type="password"
          />
        </div>
        <div class="submit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions } from "vuex";

export default Vue.extend({
  data() {
    return {
      registrationDetails: {
        email: "",
        name: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions("Auth", ["emailSignup"]),
    async useEmailSignup() {
      try {
        const resp = await this.emailSignup(this.registrationDetails);
        // catch client errors here
        if (resp.error) {
          alert(resp.error.message);
          return;
        }
        alert("You've signed up!");
        this.$router.push("/journals");
      } catch (err) {
        console.error("API error", err);
        alert("Server error");
      }
    }
  }
});
</script>

<style>
.signup-form {
  display: flex;
  flex-direction: column;
  font-size: 2em;
}
</style>
