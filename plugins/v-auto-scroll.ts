export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive("auto-scroll", {
      mounted(el, binding) {
        // console.log('%c [ binding ]-5', 'font-size:13px; background:pink; color:#bf2c9f;', binding)
      },
      updated(el, binding) {
        const generating = binding.value;
        if (generating) {
          el.scrollTop = el.scrollHeight;
        }
      },
      getSSRProps(binding, vnode) {
        // you can provide SSR-specific props here
        return {};
      },
    });
  });
  