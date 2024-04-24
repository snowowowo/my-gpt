<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUiStore } from "@/stores/ui";
import { useChatStore } from "@/stores/chats";
const uiStore = useUiStore();
const chatStore = useChatStore();
const { currentChatId, currentChat, noChatModelId } = storeToRefs(chatStore);
const { showSidebar } = storeToRefs(uiStore);

const props = defineProps<{
  showNavbar: boolean;
}>();

const modelList = ref<string[]>([
  "gpt-3.5-turbo",
  "gpt-3.5-turbo-1106",
  "gpt-4",
  "gpt-4-all",
  "gemini-pro",
]);

const handleSetModel = (modelId: string) => {
  if (currentChatId.value) {
    chatStore.updateChat(currentChatId.value, { modelId });
  } else {
    chatStore.setNoChatModelId(modelId);
  }
};
</script>

<template>
  <div
    class="absolute top-0 left-0 flex items-center justify-start w-full px-4 transition border-b bg-white/60 h-14 dark:bg-slate-900/60 backdrop-blur-sm text-slate-700 dark:text-slate-200 dark:border-slate-700"
    v-show="showNavbar">
    <div
      v-if="!showSidebar"
      class="flex items-center justify-center w-10 h-10 mr-2 cursor-pointer rounded-xl hover:bg-gray-400/20"
      @click="uiStore.toggleSidebar()">
      <Icon name="system-uicons:push-right" />
    </div>
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger
          class="min-w-[100px] hover:bg-gray-100 dark:hover:bg-slate-700 p-2 rounded-xl cursor-pointer"
          >{{
            currentChat ? currentChat.modelId : noChatModelId
          }}</DropdownMenuTrigger
        >
        <DropdownMenuContent>
          <div v-for="item in modelList">
            <DropdownMenuItem @click="handleSetModel(item)">{{
              item
            }}</DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
</template>

<style scoped></style>
