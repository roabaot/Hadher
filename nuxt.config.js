

import colors from 'vuetify/es5/util/colors'
import ar from 'vuetify/lib/locale/ar'
import en from 'vuetify/lib/locale/en'
require('dotenv').config()


export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - Web Shop",
    title: "Web Shop",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~assets/index.scss", "~assets/global.css"],

  generate: {
    // Interval in milliseconds between two render cycles to avoid
    // flooding a potential API with calls from the web application.
    interval: 300
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~plugins/core-components.client.js", ssr: false },
    "~plugins/icons.js",
    "~plugins/axios.js",
    "~plugins/vee-validate.js",
    "~plugins/notifier.js",
    "~plugins/star-rating.client.js"
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module",
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify"
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "cookie-universal-nuxt",
    ["@nuxtjs/dotenv", { systemvars: true }],
    "@nuxtjs/i18n"
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.BASE_URL || "http://localhost:3003",
    timeout: 30000,
    headers: { "Content-Type": "application/json" }
  },

  i18n: {
    baseUrl: "http://localhost:4000",
    locales: [
      {
        code: "ar",
        iso: "ar-AR",
        file: "ar-AR.js"
      },
      {
        code: "en",
        iso: "en-US",
        file: "en-US.js"
      }
    ],
    // vueI18nLoader: true,
    lazy: true,
    langDir: "lang/",
    defaultLocale: "ar",
    vueI18n: {
      fallbackLocale: "ar"
    }
  },

  // proxy: {
  //   "/api": 'http://localhost:4000'
  // },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: "en"
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ["~assets/variables.scss"],
    lang: {
      locales: { ar, en },
      current: "ar"
    },
    rtl: true,
    treeShake: false,
    theme: {
      themes: {
        dark: {
          primary: "#ffdc2c",
          accent: "#16162a",
          secondary: "#28283e",
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: "#e63131",
          success: colors.green.accent3
        },
        light: {
          background: "#f1f6fc",
          subBackground: "#F1F6FC",
          primary: "#ffdc2c",
          secondary: "#409bff",
          accent: "#292D32",
          error: "#FF4C51",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FFC107"
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["vee-validate/dist/rules"]
  },

  server: {
    host: process.env.NUXT_HOST,
    port: process.env.NUXT_PORT
  },

  // serverMiddleware: ['~/server-middleware/cart']

  extend(config, ctx) {
    if (ctx.isDev && ctx.isClient) {
      config.module.rules.push({
        enforce: "pre",
        test: /\.(js|vue)$/,
        loader: "eslint-loader",
        exclude: /(node_modules)/
      });
    }
  }
};
