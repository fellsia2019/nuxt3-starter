import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    publicRuntimeConfig: {
        TEST_VAR: process.env.TEST_VAR,
    },
    css: ['~/assets/style/main.scss'],

    typescript: {
        strict: true,
    },

    modules: ['lodash'],

    buildModules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],

    build: {
        loaders: {
            scss: {
                implementation: require('sass'),
            },
        },
    },
});
