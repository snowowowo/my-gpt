// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    tutujinKey: "sk-U7F370scao3KdM5DEb9fC408931f4651Ac49E2F579B9Ad84",
  },
  modules: ["@vueuse/nuxt", "@nuxtjs/color-mode", "@pinia/nuxt", "nuxt-icon"],
  devtools: { enabled: false },
  css: ["@/assets/css/main.css"],
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
    { path: '~/components/widgets', pathPrefix: false },
    { path: '~/components/radix', pathPrefix: false },
    // It's important that this comes last if you have overrides you wish to apply
    // to sub-directories of `~/components`.
    //
    // ~/components/Btn.vue => <Btn />
    // ~/components/base/Btn.vue => <BaseBtn />
    '~/components'
  ]
});
