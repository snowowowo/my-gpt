<script setup lang="ts">
import type { Chat } from "@/types/chat";
defineProps<{
  chatList: Chat[];
  currentChatId: string | null;
}>();
defineEmits(["selectChat"]);
</script>

<template>
  <div class="flex flex-col justify-start items-center">
    <div class="w-full border p-4">新对话</div>
    <div
      v-for="item in chatList"
      @click="$emit('selectChat', item.id)"
      class="w-full border p-4"
      :class="currentChatId === item.id ? 'bg-green-500' : ''"
    >
      <div>{{ item.name }}</div>
    </div>
  </div>
</template>

<style scoped></style>
