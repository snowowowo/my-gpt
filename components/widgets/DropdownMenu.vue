<script setup lang="ts">
import { nanoid } from "nanoid";
const open = ref(false);
const dropdown = ref();
const trigger = ref();
const content = ref();
const contentId = ref("");

const contentStyle = ref({
  top: "",
  left: "",
  transform: "",
});
onMounted(() => {
  window.addEventListener("click", handleClickOutside);
  contentId.value = nanoid();
});

onUnmounted(() => {
  window.removeEventListener("click", handleClickOutside);
});

function handleTrigger(event: Event) {
  event.stopPropagation();
  open.value = !open.value;
  if (open.value) {
    const rect = trigger.value.getBoundingClientRect();
    contentStyle.value = {
      top: `${rect.bottom + 10}px`,
      left: `${rect.left + rect.width / 2}px`,
      transform: `translateX(-50%)`,
    };
  }
}

function handleClickOutside(event: MouseEvent) {
  if (open.value && (event.target as HTMLElement).id !== contentId.value) {
    open.value = false;
  }
}
</script>

<template>
  <div class="" ref="dropdown">
    <!-- trigger -->
    <div @click="handleTrigger" class="dark:text-slate-400" ref="trigger">
      <slot name="trigger"></slot>
    </div>
    <!-- content -->
    <Teleport to="body">
      <div
        v-if="open"
        ref="content"
        :id="contentId"
        class="content w-auto z-40 fixed p-2 flex flex-col gap-y-1 top-0 left-0 justify-start items-center bg-white dark:text-slate-400 border dark:bg-slate-950 dark:border-slate-600 rounded-sm"
        :style="contentStyle">
        <slot name="content"></slot>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
</style>
