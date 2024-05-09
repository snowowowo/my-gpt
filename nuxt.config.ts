// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  routeRules: {
    "/": { ssr: false },
  },
  runtimeConfig: {
    tutujinKey: "",
  },
  modules: [
    "@vueuse/nuxt",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
    "nuxt-icon",
    "@nuxtjs/tailwindcss",
  ],
  devtools: { enabled: false },
  css: ["@/assets/css/main.css", "@/assets/css/global.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  typescript: {
    tsConfig: {
      include: [],
    },
  },
  plugins: [],
  colorMode: {
    // preference: "system", // default value of $colorMode.preference
    // fallback: "light", // fallback value if not system preference found
    // hid: "nuxt-color-mode-script",
    // globalName: "__NUXT_COLOR_MODE__",
    // componentName: "ColorScheme",
    // classPrefix: "",
    classSuffix: "",
    // storageKey: "nuxt-color-mode",
  },
  components: [
    // ~/user-module/components/account/UserDeleteDialog.vue => <UserDeleteDialog />
    { path: "~/components/widgets", pathPrefix: false },
    // It's important that this comes last if you have overrides you wish to apply
    // to sub-directories of `~/components`.
    //
    // ~/components/Btn.vue => <Btn />
    // ~/components/base/Btn.vue => <BaseBtn />
    "~/components",
  ],
});
