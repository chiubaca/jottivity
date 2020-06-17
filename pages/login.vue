<template>
  <div id="signin">
    <div class="signin-form">
      <form @submit.prevent="useLogin">
        <div class="input">
          <label for="email">Mail</label>
          <input id="email" v-model="loginCrendentials.email" type="email" />
        </div>
        <div class="input">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="loginCrendentials.password"
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
  components: {},
  data() {
    return {
      email: "testemail",
      loginCrendentials: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions("Auth", ["emailLogin"]),
    async useLogin() {
      try {
        const resp = await this.emailLogin(this.loginCrendentials);
        console.log("got response in component", resp)
      } catch (err) {
        console.error("there was an error in the component", err)
      }

    }
  }
});
</script>

<style></style>
