<script setup lang="ts">
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

function handleShowSidebar(e: MouseEvent) {
  uiStore.toggleSidebar(true);
}
</script>

<template>
  <div
    class="sticky top-0 left-0 flex items-center justify-start w-full px-4 transition border-b bg-white/60 h-14 dark:bg-slate-900/60 backdrop-blur-sm text-slate-700 dark:text-slate-200 dark:border-slate-700"
    v-show="showNavbar">
    <div
      v-if="!showSidebar"
      class="flex items-center justify-center w-10 h-10 mr-2 cursor-pointer rounded-xl hover:bg-gray-400/20"
      @click="handleShowSidebar">
      <Icon name="system-uicons:push-right" />
    </div>
    <div>
      <DropdownMenu>
        <template #trigger>
          <div class="flex justify-center items-center">
            <div class="flex items-center justify-center w-10 h-10 rounded-xl">
              <Icon name="carbon:model-alt" />
            </div>
            <div class="cursor-pointer">
              {{ currentChat?.modelId || noChatModelId }}
            </div>
          </div>
        </template>
        <template #content>
          <div
            v-for="modelId in modelList"
            @click="handleSetModel(modelId)"
            class="w-full h-8 text-start px-4 py-1 rounded-sm hover:bg-slate-100 dark:hover:bg-slate-600 cursor-pointer flex justify-start items-center">
            <div class="w-8 h-8 flex justify-center items-center">
              <Icon v-if="(currentChat?.modelId || noChatModelId) === modelId" name="mdi:dot" class="w-full h-full text-green-500 dark:text-green-700"/>
            </div>
            <div>{{ modelId }}</div>
          </div>
        </template>
      </DropdownMenu>
    </div>
  </div>
</template>

<style scoped></style>
