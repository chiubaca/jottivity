<template>
  <div id="signup">
    <div class="signup-form">
      <form @submit.prevent="onSubmit">
        <div class="input">
          <label for="email">Mail</label>
          <input type="email" id="email" v-model="registrationDetails.email" />
        </div>
        <div class="input">
          <label for="age">Your Name</label>
          <input
            type="text"
            id="name"
            v-model.number="registrationDetails.name"
          />
        </div>
        <div class="input">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="registrationDetails.password"
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
    onSubmit() {
      console.log("Submit!", process.env.NODE_ENV);
      if (process.env.NODE_ENV === "development") {
        fetch("http://localhost:8888/.netlify/functions/register", {
          method: "POST",
          body: JSON.stringify(this.registrationDetails)
        })
          .then(resp => resp.json())
          .then(data => {
            console.log(data)
          });
      } else {
        fetch(document.baseURI + ".netlify/functions/register", {
          method: "POST",
          body: JSON.stringify(this.registrationDetails)
        })
          .then(resp => resp.json())
          .then(data => {
            console.log(data)
          });
      }


    }
  }
});
</script>

<style>
</style>
