import { defineStore } from "pinia";

export const usePromptsStore = defineStore("prompts", {
  state: () => ({
    prompts: [
      {
        id: "1",
        name: "Nuxt3专家",
        prompt: "你是一个精通",
        tags: ["Nuxt", "Vue", "TypeScript", "TailwindCSS"],
      },
    ],
  }),
});
