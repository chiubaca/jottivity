/* eslint-disable import/no-mutable-exports */
// Followed pattern outlined here - https://typescript.nuxtjs.org/cookbook/store.html#class-based

import { NuxtAxiosInstance } from "@nuxtjs/axios";

let $axios: NuxtAxiosInstance;

export function initializeAxios(axiosInstance: NuxtAxiosInstance) {
  $axios = axiosInstance;

  if (process.env.NODE_ENV === "development") {
    $axios.setBaseURL(process.env.DEV_API_BASE_URL as string);
    return;
  }

  $axios.setBaseURL(
    document.location.hostname + "/.netlify/functions/register"
  );
}

export { $axios };
