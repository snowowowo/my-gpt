// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    tutujinKey: "sk-U7F370scao3KdM5DEb9fC408931f4651Ac49E2F579B9Ad84",
  },
  modules: ['@vueuse/nuxt'],
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
});
