<template>
  <div
    class="flex items-center justify-center w-10 h-10 cursor-pointer rounded-xl hover:bg-gray-400/20"
    @click="toggleColorMode"
  >
    <Icon v-if="colorMode.preference === 'dark'" name="ic:outline-light-mode" />
    <Icon v-else name="ic:outline-dark-mode" />
  </div>
</template>

<script setup>
const colorMode = useColorMode();
function toggleColorMode() {
  colorMode.preference = colorMode.preference === "light" ? "dark" : "light";
}
</script>

<style>
/* body {
  background-color: #fff;
  color: rgba(0, 0, 0, 0.8);
}
.dark-mode body {
  background-color: #091a28;
  color: #ebf4f1;
}
.sepia-mode body {
  background-color: #f1e7d0;
  color: #433422;
} */
</style>
