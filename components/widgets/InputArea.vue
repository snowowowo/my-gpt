<script setup lang="ts">
import type { Chat } from "@/types/chat";
const chatStore = useChatStore();
const { chats, currentChatId, currentChat } = storeToRefs(chatStore);

const textareaRef = ref<HTMLTextAreaElement | null>(null);
const inputText = ref<string>("");

function resizeTextarea() {
  const textarea = textareaRef.value as HTMLTextAreaElement;
  textarea.style.height = "auto";
  textarea.style.height = `${textarea.scrollHeight}px`;
  // 限制最大高度
  if (textarea.scrollHeight > 300) {
    textarea.style.height = "300px";
    textarea.style.overflowY = "auto";
  }
}

async function handleSendMessage() {
  const chatId = currentChatId.value;
  const message = inputText.value;
  if (!chatId || !message.trim()) return;
  inputText.value = "";
  await chatStore.sendMessage(chatId, message);
}
</script>

<template>
  <div class="w-full flex justify-center absolute bottom-4 left-0 right-0 overflow-hidden z-20">
    <div class="min-w-[376px] w-11/12 md:w-4/5 relative flex justify-center overflow-hidden rounded-xl border">
      <!-- <textarea
        placeholder="Type something"
        rows="1"
        type="text"
        class="w-full outline-none resize-none p-4 py-3 overflow-hidden"
        ref="textareaRef"
        v-model="inputText"
        @input="resizeTextarea"
      >
      </textarea> -->
      <textarea
        placeholder="Type something"
        rows="1"
        type="text"
        class="w-full outline-none resize-none p-4 py-3 overflow-hidden"
        ref="textareaRef"
        v-model="inputText"
        @input="resizeTextarea"
      ></textarea>
      <button
        class="absolute h-8 w-8 right-2 bottom-2 bg-green-500 hover:bg-green-400 rounded-lg text-white p-2"
        @click="handleSendMessage"
      ></button>
    </div>
  </div>
</template>

<style scoped></style>
