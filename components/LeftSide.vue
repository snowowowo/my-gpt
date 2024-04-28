<script setup lang="ts">
import { nanoid } from "nanoid";
import type { Chat } from "@/types/chat";
import { useChatStore } from "@/stores/chats";
import { useUiStore } from "@/stores/ui";
import clsx from "clsx";



const chatStore = useChatStore();
const uiStore = useUiStore();
const { showSidebar } = storeToRefs(uiStore);
const { chats } = storeToRefs(chatStore);

function handleAddNewChat() {
  const newChatId = chatStore.addNewChat();
  chatStore.setCurrentChatId(newChatId);
}

</script>
<template>
  <div
    :class="
      clsx(
        'left-side h-full w-[320px] absolute top-0 z-30 flex flex-col justify-start items-center transition-all overflow-hidden border-r',
        'bg-gray-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400 dark:border-slate-700',
        showSidebar ? 'left-0' : '-left-[330px]'
      )
    ">
    <div
      class="flex flex-col items-center justify-start w-full h-full overflow-y-scroll">
      <!-- top bar -->
      <div
        class="sticky top-0 flex items-center justify-between w-full px-4 transition backdrop-blur-sm h-14 min-h-14 gap-x-4 bg-gray-100/80 dark:bg-slate-800/80">
        <div
          @click="chatStore.setCurrentChatId('')"
          class="font-bold cursor-pointer">
          MyGPT
        </div>
        <div class="flex items-center justify-start gap-x-4">
          <div
            class="flex items-center justify-center w-10 h-10 cursor-pointer rounded-xl hover:bg-gray-400/20"
            @click="handleAddNewChat">
            <Icon name="fluent:add-48-filled" />
          </div>
          <div
            class="flex items-center justify-center w-10 h-10 cursor-pointer rounded-xl hover:bg-gray-400/20"
            @click="uiStore.toggleSidebar(false)">
            <Icon name="system-uicons:push-left" />
          </div>
        </div>
      </div>
      <!-- list -->
      <div
        class="flex flex-col items-center justify-start flex-1 w-full p-4 gap-y-2">
        <div
          v-for="item in chats"
          @click="chatStore.setCurrentChatId(item.id)"
          class="w-full h-14">
          <ChatName :chat="item"></ChatName>
        </div>
      </div>
      <!-- bottom bar -->
      <div
        class="sticky bottom-0 flex items-center justify-between w-full px-4 transition h-14 min-h-14 gap-x-4 bg-gray-100/80 dark:bg-slate-800/80 backdrop-blur-sm">
        <ThemeSwitcher></ThemeSwitcher>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
