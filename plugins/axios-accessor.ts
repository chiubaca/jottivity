// Followed pattern outlined here - https://typescript.nuxtjs.org/cookbook/store.html#class-based

import { Plugin } from "@nuxt/types";
import { initializeAxios } from "~/utils/api";

const accessor: Plugin = ({ $axios }) => {
  initializeAxios($axios);
};

export default accessor;
