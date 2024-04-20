<script setup lang="ts">
import type { Chat, Message } from "@/types/chat";
import { nanoid } from "nanoid";
import "highlight.js/styles/github-dark.min.css";
import { handleChunkText } from "@/utils/index";

interface ApiResponse {
  choices: { message: Message }[];
}

const chatList = ref<Chat[]>([]);
const currentChatId = ref<string | null>(null);
const currentChat = computed(() => chatList.value.find((chat) => chat.id === currentChatId.value));

const isShowSidebar = ref<boolean>(true);

function handleNewChat() {
  const chatId = nanoid();
  chatList.value.push({
    id: chatId,
    name: "New Chat",
    modelId: "gpt-3.5-turbo",
    messages: [],
    inputText: "",
  });
  currentChatId.value = chatId;
}

async function handleSendMessage(event: { currentChatId: string }) {
  if (!event.currentChatId) return;
  const _currentChat = chatList.value.find((chat) => chat.id === event.currentChatId);
  if (!_currentChat) return;
  _currentChat.messages.push({
    role: "user",
    content: _currentChat.inputText,
  });
  _currentChat.inputText = "";
  const newMessage = {
    role: "assistant",
    content: "",
  };
  _currentChat.messages.push(newMessage);
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        modelId: _currentChat.modelId,
        messages: _currentChat.messages,
      }),
    });

    const reader = response.body?.getReader();
    if (!reader) return;
    const decoder = new TextDecoder();
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      const text = handleChunkText(decoder.decode(value));
      _currentChat.messages[_currentChat.messages.length - 1].content += text;
    }
  } catch (error) {
    console.log("%c [ error ]-39", "font-size:13px; background:pink; color:#bf2c9f;", error);
  }
}

function handleUpdateChatInfo(event: { currentChatId: string; name?: string; modelId?: string; inputText?: string }) {
  const _currentChat = chatList.value.find((chat) => chat.id === event.currentChatId);
  if (!_currentChat) return;
  event.name && (_currentChat.name = event.name);
  event.modelId && (_currentChat.modelId = event.modelId);
  event.inputText && (_currentChat.inputText = event.inputText);
}
</script>

<template>
  <div class="w-full h-full overflow-hidden">
    <div class="w-full h-full overflow-hidden flex flex-row justify-end items-center relative">
      <LeftSide
        :chatList="chatList"
        :currentChatId="currentChatId"
        @selectChat="currentChatId = $event"
        @newChat="handleNewChat"
        class="h-full w-[320px] absolute top-0 z-10"
        :class="isShowSidebar ? 'left-0' : '-left-[330px]'"
      ></LeftSide>
      <div
        class="w-4 h-8 bg-green-500 absolute top-1/2 -translate-y-1/2 z-10 transition-all cursor-pointer"
        :class="isShowSidebar ? 'left-[330px]' : 'left-2'"
        @click="isShowSidebar = !isShowSidebar"
      ></div>
      <!-- :chatList="chatList" :currentChatId="currentChatId" -->
      <RigtSide
        :currentChat="currentChat"
        @sendMessage="handleSendMessage"
        @newChat="handleNewChat"
        @updateChatInfo="handleUpdateChatInfo"
        class="h-full overflow-hidden"
        :class="isShowSidebar ? 'w-full md:w-[calc(100%_-_320px)]' : 'w-full'"
      ></RigtSide>
      <!-- :style="{ width: isShowSidebar ? (isMediumScreen ? 'calc(100% - 320px)' : '100%') : '100%' }" -->
    </div>
  </div>
</template>

<style scoped></style>
