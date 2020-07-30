export default {
  mode: "spa",
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      "data-theme": "light"
    },
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: ["./assets/styles/main"],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "./plugins/axios-accessor",
    { src: "~/plugins/vuex-persist", ssr: false }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    "@nuxt/typescript-build",
    // Doc: https://github.com/nuxt-community/stylelint-module
    "@nuxtjs/stylelint-module",
    [
      "@nuxtjs/pwa",
      {
        icon: {
          iconSrc: "./assets/images/logo.png"
        },
        manifest: {
          name: "Jottivity",
          short_name: "Jottivity",
          description: "Jot your thoughts and mood"
        },
        workbox: {
          runtimeCaching: [
            {
              urlPattern: "https://fonts.gstatic.com/.*",
              handler: "cacheFirst",
              method: "GET",
              strategyOptions: { cacheableResponse: { statuses: [0, 200] } }
            }
          ]
        }
      }
    ]
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    // Doc: https://github.com/nuxt-community/dotenv-module
    "@nuxtjs/dotenv"
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
