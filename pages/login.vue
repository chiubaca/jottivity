<template>
  <div id="signin">
    <div class="container--center signin-form">
      <h1>Welcome Back!</h1>
      <form @submit.prevent="useLogin">
        <div class="input">
          <label for="email">Email</label>
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
          <button type="submit">Login</button>
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

        // catch client errors here
        if (resp.error) {
          alert(resp.error.message);
          return;
        }
        alert("You've signed in!");
        this.$router.push("/journals");
      } catch (err) {
        // server error throw here
        console.error("there was an error in the component", err);
      }
    }
  }
});
</script>

<style>
.signin-form {
  display: flex;
  flex-direction: column;
  font-size: 2em;
}
</style>
