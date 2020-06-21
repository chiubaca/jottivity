/* eslint-disable import/no-mutable-exports */
// Followed pattern outlined here - https://typescript.nuxtjs.org/cookbook/store.html#class-based

import { NuxtAxiosInstance } from "@nuxtjs/axios";

let $axios: NuxtAxiosInstance;

export function initializeAxios(axiosInstance: NuxtAxiosInstance) {
  $axios = axiosInstance;

  if (process.env.NODE_ENV === "development") {
    console.log("We're in dev");
    $axios.setBaseURL(process.env.DEV_API_BASE_URL as string);
    // only throw error if status code is 500 or above
    $axios.defaults.validateStatus = (status: number) => status <= 500;
    console.log($axios);
    return;
  }
  if (process.env.NODE_ENV === "production") {
    console.log("We're in prod");
    $axios.setBaseURL(
      "https://" + document.location.hostname + "/.netlify/functions/"
    );
    $axios.defaults.validateStatus = (status: number) => status <= 500; 
    console.log($axios);
  }
}

export { $axios };
