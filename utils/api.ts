/* eslint-disable import/no-mutable-exports */
// Followed pattern outlined here - https://typescript.nuxtjs.org/cookbook/store.html#class-based

import { NuxtAxiosInstance } from "@nuxtjs/axios";

let $axios: NuxtAxiosInstance;

export function initializeAxios(axiosInstance: NuxtAxiosInstance) {
  $axios = axiosInstance;
  // only throw error if status code is 500 or above
  $axios.defaults.validateStatus = (status: number) => status <= 500;

  if (process.env.NODE_ENV === "development") {
    $axios.setBaseURL(process.env.DEV_API_BASE_URL as string);
    return;
  }
  if (process.env.NODE_ENV === "production") {
    $axios.setBaseURL(
      "https://" + document.location.hostname + "/.netlify/functions/"
    );
  }
}

export { $axios };
