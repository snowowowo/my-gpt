<script setup lang="ts">
const chatStore = useChatStore();
const { currentChatId, currentChat, noChatModelId } = storeToRefs(chatStore);

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
  if (textarea.scrollHeight > 300 && inputText.value.length > 0) {
    textarea.style.height = "300px";
    textarea.style.overflowY = "auto";
  }
}

async function handleSendMessage() {
  let chatId = currentChatId.value;
  const message = inputText.value;
  if (!message.trim()) return;

  if (!chatId) {
    // 创建新的对话
    const newChatId = chatStore.addNewChat(noChatModelId.value);
    chatStore.setCurrentChatId(newChatId);
    chatId = newChatId;
  }

  inputText.value = "";
  chatStore.addUserMessage(chatId, message);
  const messages = currentChat.value?.messages || [];
  chatStore.addAssistantMessage(chatId);
  await chatStore.sendMessage(chatId, messages);
}

function onShiftEnter(e: KeyboardEvent) {
  if (e.ctrlKey && e.key === "Enter") {
    e.preventDefault();
    handleSendMessage();
  }
}

function handleStopGenerating() {
  chatStore.updateChat(currentChatId.value, { status: "idle" });
}
</script>

<template>
  <div
    class="absolute w-10/12 md:w-4/5 left-1/2 -translate-x-1/2 z-20 flex justify-center overflow-hidden bottom-4">
    <div
      class="min-w-[376px] w-full relative flex justify-center overflow-hidden rounded-xl border">
      <!-- prompt framwork button -->
      <!-- <div
        class="flex justify-center items-center absolute left-2 bottom-[6px] gap-x-2">
        <div
          class="flex items-center justify-center w-8 h-8 p-2 text-white rounded-lg cursor-pointer"
          @click="handleUsePromptFrame">
          <Icon
            name="material-symbols-light:article-sharp"
            class="text-slate-500 w-8 h-8" />
        </div>
      </div> -->
      <!-- textarea -->
      <textarea
        placeholder="Type something"
        rows="1"
        type="text"
        class="w-full p-4 py-3 overflow-hidden outline-none resize-none dark:bg-slate-800 dark:text-slate-200"
        ref="textareaRef"
        v-model="inputText"
        @keyup.ctrl.enter="onShiftEnter"></textarea>

      <!-- stop button -->
      <div
        v-if="currentChat?.status === 'generating'"
        class="flex justify-center items-center absolute right-2 bottom-2 gap-x-2">
        <div
          class="flex items-center justify-center w-8 h-8 p-2 text-white rounded-lg cursor-pointer dark:hover:bg-slate-600 hover:bg-slate-200"
          @click="handleStopGenerating">
          <Icon
            name="carbon:stop-filled-alt"
            class="text-red-500 dark:text-red-600" />
        </div>
      </div>
      <!-- send button -->
      <div
        v-else
        class="flex justify-center items-center absolute right-2 bottom-[6px] gap-x-2">
        <div class="text-[12px] text-slate-400">Ctrl + Enter</div>
        <div
          class="flex items-center justify-center w-8 h-8 p-2 text-white rounded-lg cursor-pointer dark:hover:bg-slate-600 hover:bg-slate-200"
          @click="handleSendMessage">
          <Icon
            name="fluent:send-20-filled"
            class="text-slate-500 dark:text-slate-400" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
