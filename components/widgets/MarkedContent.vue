<script setup lang="ts">
const props = defineProps<{
  content: string;
}>();
const { marked } = useMarked();
const contentHtml = computed(() => {
//   console.log("%c [ marked.parse(props.content) ]-8", "font-size:13px; background:pink; color:#bf2c9f;", props.content);
  return marked.parse(props.content);
});
</script>

<template>
  <div v-html="contentHtml"></div>
</template>

<style scoped></style>
