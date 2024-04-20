<script setup lang="ts">
import type { Chat } from "@/types/chat";

const modelList = ref<string[]>(["gpt-3.5-turbo", "gpt-3.5-turbo-1106", "gpt-4", "gpt-4-all", "gemini-pro"]);

const props = defineProps<{
  currentChat: Chat | undefined;
}>();

const emit = defineEmits(["sendMessage", "newChat", "updateChatInfo"]);

function handleEmitSendMessage() {
  if (!props.currentChat) return;
  emit("sendMessage", {
    currentChatId: props.currentChat.id,
  });
}

const { marked } = useMarked();
</script>

<template>
  <div class="h-full bg-white overflow-hidden relative transition-all">
    <div v-if="!currentChat" class="w-full h-full flex flex-col gap-y-4 justify-center items-center">
      <div>Please select a chat, or</div>
      <div
        class="rounded-xl bg-green-400 text-white hover:bg-green-500 px-4 py-2 cursor-pointer"
        @click="$emit('newChat')"
      >
        New Chat
      </div>
    </div>

    <div v-else class="w-full h-full flex flex-col mx-auto">
      <!-- model list -->
      <div class="absolute top-4 left-4">
        <select
          class="bg-green-500 text-white rounded-xl px-4 py-2"
          :value="currentChat?.modelId"
          @change="
            (e) => {
              emit('updateChatInfo', { currentChatId: currentChat?.id, modelId: e?.target?.value });
            }
          "
        >
          <option v-for="item in modelList" :value="item">{{ item }}</option>
        </select>
      </div>
      <!-- chat history -->
      <div class="w-full flex-1 overflow-hidden">
        <!-- <div>{{ chatChat?.message }}</div> -->
        <div class="w-full h-full overflow-y-scroll py-8 px-4">
          <div class="min-w-[376px] md:w-4/5 mx-auto">
            <div v-for="item in currentChat?.messages" class="w-full p-4 mb-4">
              <!-- avatar -->
              <div class="flex flex-row justify-start items-center py-2 gap-x-2 mb-2">
                <div class="w-8 h-8 rounded-full bg-green-500 leading-8 text-center text-lg text-white">
                  {{ item.role.slice(0, 1).toUpperCase() }}
                </div>
                <div class="text-lg font-bold text-gray-700">{{ item.role }}</div>
              </div>
              <!-- content -->
              <div v-html="marked.parse(item.content)" class="markdown-body"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- input -->
      <div v-resize class="w-full h-40 overflow-hidden flex justify-center relative border-t bg-red-100">
        <textarea
          v-focus
          :value="currentChat?.inputText"
          @input="
            (e) => {
              emit('updateChatInfo', { currentChatId: currentChat?.id, inputText: e?.target?.value });
            }
          "
          type="text"
          class="w-full h-full p-4 outline-none resize-none pb-16"
          @keydown.enter="handleEmitSendMessage"
        ></textarea>
        <button
          class="absolute right-2 top-2 ml-2 bg-green-500 hover:bg-green-400 rounded-xl text-white py-2 px-4"
          @click="handleEmitSendMessage"
        >
          发送
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.markdown-body code.hljs {
  border-radius: 10px;
  margin: 10px 0;
}
</style>
