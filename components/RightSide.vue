<script setup lang="ts">
import type { Chat } from "@/types/chat";
import { useChatStore } from "@/stores/chats";
import { useUiStore } from "@/stores/ui";
const chatStore = useChatStore();
const uiStore = useUiStore();
const { chats, currentChatId, currentChat } = storeToRefs(chatStore);
const { showSidebar } = storeToRefs(uiStore);

const showNavbar = ref(true);
let lastScrollTop = 0;
const indexInputText = ref<string>("");

const handleScroll = (e: Event) => {
  const currentScrollTop = (e.target as HTMLElement).scrollTop;
  showNavbar.value = currentScrollTop < lastScrollTop || currentScrollTop <= 0;
  lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
};
</script>

<template>
  <div
    class="relative h-full overflow-hidden transition-all bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-100"
    :class="showSidebar ? 'w-full md:w-[calc(100%_-_320px)]' : 'w-full'"
  >
    <!-- navbar -->
    <RightSideNav :showNavbar="showNavbar"></RightSideNav>
    <!-- main -->
    <div class="flex flex-col w-full h-full mx-auto">
      <!-- chat history -->
      <div v-if="currentChatId" class="w-full overflow-hidden">
        <div class="w-full h-full overflow-y-scroll py-14 scroll-smooth" @scroll="handleScroll">
          <div class="min-w-[376px] md:w-4/5 mx-auto p-6 overflow-hidden">
            <div v-for="item in currentChat?.messages" class="box-border w-full mb-4">
              <!-- avatar -->
              <div class="flex flex-row items-center justify-start py-2 mb-2 gap-x-2">
                <div class="w-8 h-8 text-lg leading-8 text-center text-white bg-green-500 rounded-full">
                  {{ item.role.slice(0, 1).toUpperCase() }}
                </div>
                <div class="text-lg font-bold text-gray-700 dark:text-slate-400">{{ item.role }}</div>
              </div>
              <!-- content -->
              <MarkedContent :content="item.content" class="markdown-body dark:text-slate-400"></MarkedContent>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="flex items-center justify-center w-full h-full overflow-hidden">
        <div>预设</div>
        <div>预设</div>
      </div>
      <!-- input -->
      <InputArea></InputArea>
    </div>
  </div>
</template>

<style scoped></style>
