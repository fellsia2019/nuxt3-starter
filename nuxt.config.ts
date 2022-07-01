import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  publicRuntimeConfig: {
    TEST_VAR: process.env.TEST_VAR,
  },
  css: ["~/assets/style/test.css"],

  typescript: {
    strict: true,
  },

  buildModules: ["@pinia/nuxt"],

  build: {
    loaders: {
      scss: {
        implementation: require("sass"),
      },
    },
    postcss: {
      postcssOptions: require("./postcss.config.js"),
    },
  },
});
