<script setup lang="ts">
import type { Chat } from "@/types/chat";
import { useChatStore } from "@/stores/chats";
import { useUiStore } from "@/stores/ui";
const chatStore = useChatStore();
const uiStore = useUiStore();
const { chats, currentChatId, currentChat } = storeToRefs(chatStore);
const { showSidebar } = storeToRefs(uiStore);

const modelList = ref<string[]>(["gpt-3.5-turbo", "gpt-3.5-turbo-1106", "gpt-4", "gpt-4-all", "gemini-pro"]);
const showNavbar = ref(true);
let lastScrollTop = 0;
const indexInputText = ref<string>("");

const handleScroll = (e: Event) => {
  const currentScrollTop = (e.target as HTMLElement).scrollTop;
  showNavbar.value = currentScrollTop < lastScrollTop || currentScrollTop <= 0;
  lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
};

function handleSelectMedel(e: Event) {}
</script>

<template>
  <div
    class="h-full bg-white overflow-hidden relative transition-all"
    :class="showSidebar ? 'w-full md:w-[calc(100%_-_320px)]' : 'w-full'"
  >
    <!-- navbar -->
    <div
      class="w-full h-14 px-4 border-b absolute bg-white top-0 left-0 flex justify-start items-center text-slate-700"
      v-show="showNavbar"
    >
      <div
        v-if="!showSidebar"
        class="w-10 h-10 rounded-2xl bg-gray-500/10 hover:bg-gray-400/20 cursor-pointer flex justify-center items-center"
        @click="uiStore.toggleSidebar()"
      >
        =
      </div>
      <DropdownMenu> Medel </DropdownMenu>
      <!-- <select class="rounded-xl px-2 py-2 outline-none" :value="currentChat?.modelId" @change="handleSelectMedel">
        <option v-for="item in modelList" :value="item" class="h-10 outline-none border-none">{{ item }}</option>
      </select> -->
    </div>
    <div class="w-full h-full flex flex-col mx-auto">
      <!-- chat history -->
      <div class="w-full overflow-hidden">
        <div class="w-full h-full overflow-y-scroll py-14 scroll-smooth" @scroll="handleScroll">
          <div class="min-w-[376px] md:w-4/5 mx-auto p-6 overflow-hidden">
            <div v-for="item in currentChat?.messages" class="w-full box-border mb-4">
              <!-- avatar -->
              <div class="flex flex-row justify-start items-center py-2 gap-x-2 mb-2">
                <div class="w-8 h-8 rounded-full bg-green-500 leading-8 text-center text-lg text-white">
                  {{ item.role.slice(0, 1).toUpperCase() }}
                </div>
                <div class="text-lg font-bold text-gray-700">{{ item.role }}</div>
              </div>
              <!-- content -->
              <MarkedContent :content="item.content" class="markdown-body"></MarkedContent>
            </div>
          </div>
        </div>
      </div>
      <!-- input -->
      <InputArea></InputArea>
    </div>
  </div>
</template>

<style scoped></style>
