export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("resize", {
    mounted(el) {
    //   console.log("%c [ resize mounted]-5", "font-size:13px; background:pink; color:#bf2c9f;", el);
      // 假设这个元素只支持鼠标拖拽上边缘来改变高度
      // 创建控件元素
      const control = document.createElement("div");
      control.style.position = "absolute";
      control.style.width = "100%";
      control.style.height = "5px";
    //   control.style.background = "rgba(0,0,0,.1)";
      control.style.left = "0";
      control.style.top = "-2px";
      control.style.cursor = "ns-resize";
      control.style.zIndex = "9999";
      el.style.position = "relative";
      el.appendChild(control);

      // 鼠标按下事件
      control.addEventListener("mousedown", function (e) {
        let height = el.offsetHeight;
        let mouseY = e.clientY;
        function handleMove(e: MouseEvent) {
          const moveY = e.clientY - mouseY;
          el.style.height = height + (-moveY) + "px";
          mouseY = e.clientY;
          height = el.offsetHeight;
          if (el.offsetHeight < 100) {
            el.style.height = "100px";
          }
          if (el.offsetHeight > 500) {
            el.style.height = "500px";
          }
        }

        document.addEventListener("mousemove", handleMove);
        document.addEventListener("mouseup", function () {
          document.removeEventListener("mousemove", handleMove);
          document.removeEventListener("mouseup", handleMove);
        });
      });
    },
    getSSRProps(binding, vnode) {
      // you can provide SSR-specific props here
      return {};
    },
  });
});
