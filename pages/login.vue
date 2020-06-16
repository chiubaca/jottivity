<template>
  <div id="signin">
    <div class="signin-form">
      <form @submit.prevent="useLogin">
        <div class="input">
          <label for="email">Mail</label>
          <input type="email" id="email" v-model="loginCrendentials.email" />
        </div>
        <div class="input">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="loginCrendentials.password"
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
    ...mapActions("Auth", ["login"]),
    useLogin() {
      this.login(this.loginCrendentials);
    }
  }
});
</script>

<style>
</style>
