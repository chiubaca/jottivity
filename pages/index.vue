<template>
  <div class="container--center">
    <div>
      <div class="logo">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="pen"
        >
          <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
          <path d="M2 2l7.586 7.586"></path>
          <circle cx="11" cy="11" r="2"></circle>
        </svg>

        <h1 class="title">
          Jottivity.
        </h1>
      </div>

      <h2 class="subtitle">
        Jot your thoughts, mood & productivity
      </h2>
      <div class="links">
        <a href="./login" class="button--green">
          Login
        </a>
        <a href="./signup" class="button--grey">
          Signup
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style>
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
}
.title {
  padding-left: 10px;
  letter-spacing: 1px;
  font-weight: 700;
  text-align: center;
}

.subtitle {
  font-weight: 300;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.pen {
  height: 100%;
  width: 50px;
}
</style>
