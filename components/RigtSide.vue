<script setup lang="ts">
import type { Chat } from "@/types/chat";
const props = defineProps<{
  chatList: Chat[];
  currentChatId: string | null;
}>();

const emit = defineEmits(["sendMessage"]);

const currentChat = computed(() => {
  return props.chatList.find((chat) => chat.id === props.currentChatId);
});

const inputText = ref<string>("");

function handleEmitSendMessage() {
  if (!props.currentChatId) return;
  emit("sendMessage", {
    currentChatId: props.currentChatId,
    message: inputText.value,
  });
  inputText.value = "";
}
</script>

<template>
  <div class="relative">
    <div class="p-4">
      <div>right side</div>
      <div>{{ currentChatId }}</div>
      <!-- <div>{{ chatChat?.message }}</div> -->
      <div v-for="item in currentChat?.messages" class="w-full p-4 border">
        <div>{{ item.role }}</div>
        <div>{{ item.content }}</div>
      </div>
    </div>
    <!-- input -->
    <div class="absolute bottom-4 w-full flex p-4 justify-center">
      <div class="relative w-96 border">
        <input v-model="inputText" type="text" class="w-full border p-4" />
        <button
          @click="handleEmitSendMessage"
          class="absolute right-2 top-2 ml-2 bg-blue-500 text-white p-2"
        >
          发送
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
