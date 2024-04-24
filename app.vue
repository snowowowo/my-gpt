<script setup lang="ts">
import { ConfigProvider } from "radix-vue";

const useIdFunction = () => useId();
</script>

<template>
  <ConfigProvider :use-id="useIdFunction">
    <div class="w-full h-full overflow-hidden">
      <NuxtPage />
    </div>
  </ConfigProvider>
</template>

<style scoped></style>