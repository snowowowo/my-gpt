<script setup lang="ts">
import type { Chat } from "@/types/chat";
const chatStore = useChatStore();
const { chats, currentChatId, currentChat, noChatModelId } =
  storeToRefs(chatStore);

const textareaRef = ref<HTMLTextAreaElement | null>(null);
const inputText = ref<string>("");
watch(inputText, () => {
  resizeTextarea();
});

function resizeTextarea() {
  const textarea = textareaRef.value as HTMLTextAreaElement;
  textarea.style.height = "auto";
  if (inputText.value.length > 0) {
    textarea.style.height = `${textarea.scrollHeight}px`;
  }
  // 限制最大高度
  if (textarea.scrollHeight > 300) {
    textarea.style.height = "300px";
    textarea.style.overflowY = "auto";
  }
}

async function handleSendMessage() {
  const chatId = currentChatId.value;
  const message = inputText.value;
  if (!message.trim()) return;

  if (!chatId) {
    const newChatId = chatStore.addNewChat(noChatModelId.value);
    chatStore.setCurrentChatId(newChatId);
    inputText.value = "";
    await chatStore.sendMessage(newChatId, message);
  } else {
    inputText.value = "";
    await chatStore.sendMessage(chatId, message);
  }
}
</script>

<template>
  <div
    class="absolute left-0 right-0 z-20 flex justify-center w-full overflow-hidden bottom-4">
    <div
      class="min-w-[376px] w-11/12 md:w-4/5 relative flex justify-center overflow-hidden rounded-xl border">
      <!-- <textarea
        placeholder="Type something"
        rows="1"
        type="text"
        class="w-full p-4 py-3 overflow-hidden outline-none resize-none"
        ref="textareaRef"
        v-model="inputText"
        @input="resizeTextarea"
      >
      </textarea> -->
      <textarea
        placeholder="Type something"
        rows="1"
        type="text"
        class="w-full p-4 py-3 overflow-hidden outline-none resize-none dark:bg-slate-800 dark:text-slate-200"
        ref="textareaRef"
        v-model="inputText"></textarea>

      <div
        class="absolute flex items-center justify-center w-8 h-8 p-2 text-white rounded-lg cursor-pointer dark:hover:bg-slate-600 right-2 bottom-2 hover:bg-slate-200"
        @click="handleSendMessage">
        <Icon
          name="fluent:send-20-filled"
          class="text-slate-500 dark:text-slate-400" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
