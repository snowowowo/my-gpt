import { defineStore } from "pinia";

export const useUiStore = defineStore("ui", {
  state: () => ({
    showSidebar: true,
  }),
  actions: {
    toggleSidebar(show: boolean) {
      this.showSidebar = show;
    },
  },
});
