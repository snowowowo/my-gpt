<script setup lang="ts">
import { nanoid } from "nanoid";
import type { Chat } from "@/types/chat";
import { useChatStore } from "@/stores/chats";
import { useUiStore } from "@/stores/ui";

const chatStore = useChatStore();
const uiStore = useUiStore();
const { showSidebar } = storeToRefs(uiStore);
const { chats, currentChatId } = storeToRefs(chatStore);

function handleAddNewChat() {
  const newChat: Chat = {
    id: nanoid(),
    name: "New Chat",
    modelId: "gpt-3.5-turbo",
    messages: [],
    inputText: "",
  };
  chatStore.addNewChat(newChat);
}

const contextMenu = [
  {
    name: "删除",
    action: (chatId: string) => {
      chatStore.deleteChat(chatId);
    },
  },
  {
    name: "重命名",
    action: () => {
      console.log("rename");
    },
  },
];
</script>
<template>
  <div
    class="h-full w-[320px] absolute top-0 z-30 flex flex-col justify-start items-center transition-all bg-gray-100 dark:bg-slate-700 overflow-hidden"
    :class="showSidebar ? 'left-0' : '-left-[330px]'"
  >
    <div class="w-full h-full relative">
      <div class="w-full h-14 px-4 flex justify-between items-center gap-x-4">
        <div @click="chatStore.setCurrentChatId('')">CatCPT</div>
        <div class="flex justify-start items-center gap-x-4">
          <div
            class="w-10 h-10 rounded-2xl bg-gray-500/10 hover:bg-gray-400/20 cursor-pointer flex justify-center items-center"
            @click="handleAddNewChat"
          >
            +
          </div>
          <div
            class="w-10 h-10 rounded-2xl bg-gray-500/10 hover:bg-gray-400/20 cursor-pointer flex justify-center items-center"
            @click="uiStore.toggleSidebar()"
          >
            <
          </div>
        </div>
      </div>
      <!-- list -->
      <div class="w-full h-full flex flex-col justify-start items-center gap-y-2 p-4 overflow-y-scroll">
        <div
          v-for="item in chats"
          @click="chatStore.setCurrentChatId(item.id)"
          class="w-full h-14"
          :class="[currentChatId === item.id ? 'text-white bg-green-500 hover:bg-green-400' : 'hover:bg-gray-300']"
        >
          <ContextMenu :contextMenu="contextMenu" :chatId="item.id">
            <ChatName :chat="item" class="w-full h-full p-4"></ChatName>
          </ContextMenu>
        </div>
      </div>
      <!-- bottom bar -->
      <div class="w-full h-14 px-4 flex justify-between items-center gap-x-4 absolute bottom-0">
        <ThemeSwitcher></ThemeSwitcher>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
