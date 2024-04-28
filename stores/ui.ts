import { defineStore } from "pinia";
import { useMediaQuery } from "@vueuse/core";

const isMediumScreen = useMediaQuery('(min-width: 768px)')

export const useUiStore = defineStore("ui", {
  state: () => ({
    showSidebar: isMediumScreen,
  }),
  actions: {
    toggleSidebar(show: boolean) {
      this.showSidebar = show;
    },
  },
});
