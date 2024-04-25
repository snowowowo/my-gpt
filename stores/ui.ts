import { defineStore } from "pinia";

export const useUiStore = defineStore("ui", {
  state: () => ({
    showSidebar: true,
  }),
  actions: {
    toggleSidebar(show?: boolean) {
      console.log('%c [ show ]-9', 'font-size:13px; background:pink; color:#bf2c9f;', show)
      if (show !== undefined) {
        this.showSidebar = show;
        return;
      }
      this.showSidebar = !this.showSidebar;
    },
  },
});
