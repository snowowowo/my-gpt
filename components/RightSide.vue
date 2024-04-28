<script setup lang="ts">
import type { Chat } from "@/types/chat";
import { getModelNameByModelId } from "@/utils/index";
import { useChatStore } from "@/stores/chats";
import { useUiStore } from "@/stores/ui";

const chatStore = useChatStore();
const uiStore = useUiStore();
const { chats, currentChatId, currentChat } = storeToRefs(chatStore);
const { showSidebar } = storeToRefs(uiStore);
const showNavbar = ref(true);

function handleRetry() {
  const messages = currentChat.value?.messages.slice(0, -1) || [];
  chatStore.sendMessage(currentChatId.value, messages);
}
</script>

<template>
  <div
    class="relative h-full overflow-hidden transition-all bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-100"
    :class="showSidebar ? 'w-full md:w-[calc(100%_-_320px)]' : 'w-full'">
    <!-- navbar -->
    <RightSideNav :showNavbar="showNavbar"></RightSideNav>
    <!-- main -->
    <div class="flex flex-col w-full h-full mx-auto main">
      <!-- chat history -->
      <div
        v-if="currentChatId && currentChat?.messages.length"
        class="w-full h-full overflow-hidden">
        <div
          class="w-full h-full pb-60 overflow-y-scroll"
          v-auto-scroll="currentChat.status === 'generating'">
          <div class="min-w-[376px] md:w-4/5 mx-auto p-6">
            <div
              v-for="item in currentChat?.messages"
              class="w-full mb-6">
              <!-- avatar -->
              <div
                class="flex flex-row items-center justify-start py-2 mb-2 gap-x-4">
                <div
                  v-if="item.role === 'user'"
                  class="w-8 h-8 flex justify-center items-center rounded-full border">
                  <Icon name="iconoir:user" class="text-green-500 font-bold" />
                </div>
                <div
                  v-else
                  class="w-8 h-8 flex justify-center items-center rounded-full bg-green-500 dark:bg-green-700">
                  <Icon name="fluent:bot-20-regular" class="text-white" />
                </div>
                <div
                  class="text-lg text-gray-800 dark:text-slate-300 flex justify-start items-center">
                  <div>{{ item.role === "user" ? "You" : "AI" }}</div>
                  <div
                    v-if="item.role === 'assistant' && item.modelId"
                    class="ml-2 text-gray-400 dark:text-gray-600 flex justify-start items-center">
                    <Icon name="mdi:dot" class="mr-1 h-8 w-8" />
                    {{ getModelNameByModelId(item.modelId) }}
                  </div>
                </div>
              </div>
              <!-- content -->
              <MarkedContent
                :content="item.content"
                class="markdown-body dark:text-slate-400 md:pl-12">
              </MarkedContent>
            </div>
            <!-- error -->
            <div
              v-if="currentChat.status === 'error'"
              class="flex py-4 flex-col items-center justify-center w-full h-[calc(100%-120px)] overflow-hidden">
              <div>出现错误</div>
              <div @click="handleRetry" class="text-green-500 cursor-pointer">
                重试
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else
        class="flex items-center justify-center w-full h-[calc(100%-120px)] overflow-hidden">
        <div>请问我任何问题。</div>
      </div>
      <!-- input -->
      <InputArea></InputArea>
    </div>
  </div>
</template>

<style scoped></style>
