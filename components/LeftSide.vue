<script setup lang="ts">
import type { Chat } from "@/types/chat";
defineProps<{
  chatList: Chat[];
  currentChatId: string | null;
}>();
defineEmits(["selectChat", "newChat"]);
</script>
<template>
  <div class="h-full flex flex-col justify-start items-center transition-all p-4 bg-gray-100 overflow-hidden">
    <div class="w-full h-full">
      <!-- <div class="w-full border p-4" @click="switchSidebar(false)">收起</div> -->
      <div
        class="w-full rounded-2xl p-4 bg-gray-500/10 hover:bg-gray-400/20 mb-2 cursor-pointer"
        @click="$emit('newChat')"
      >
        新对话
      </div>
      <!-- list -->
      <div class="flex flex-col justify-start items-center gap-y-2">
        <div
          v-for="item in chatList"
          @click="$emit('selectChat', item.id)"
          class="w-full p-4 rounded-2xl cursor-pointer"
          :class="[currentChatId === item.id ? 'text-white bg-green-500 hover:bg-green-400' : 'hover:bg-gray-300']"
        >
          <div>{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
