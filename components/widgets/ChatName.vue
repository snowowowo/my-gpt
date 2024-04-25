<script setup lang="ts">
import type { Chat } from "@/types/chat";
import { useChatStore } from "@/stores/chats";
const chatStore = useChatStore();
const { chats, currentChatId, currentChat } = storeToRefs(chatStore);
const props = defineProps<{
  chat: Chat;
}>();

const chatName = computed(() => {
  return chats.value.find((c) => c.id === props.chat.id)?.name;
});
const input = ref<HTMLInputElement | null>(null);
const onEditChatName = ref(false);

function handleDeleteChat() {
  chatStore.deleteChat(props.chat.id);
}

function handleTurnOnEditMode() {
  onEditChatName.value = true;
  nextTick(() => {
    if (input.value) {
      input.value.focus();
    }
  });
}

function handleUpdateChatName(e: Event) {
  const target = e.target as HTMLInputElement;
  chatStore.updateChat(props.chat.id, { name: target?.value });
}
</script>

<template>
  <div
    class="flex items-center justify-between w-full h-full p-4 transition-all rounded-sm cursor-pointer"
    :class="[
      currentChatId === chat.id
        ? 'bg-green-500 hover:bg-green-500/80 dark:bg-green-700 dark:hover:bg-green-700/80 text-white dark:text-white'
        : 'hover:bg-gray-200 dark:hover:bg-gray-700',
    ]">
    <input
      v-if="onEditChatName"
      class="bg-transparent outline-none"
      :value="chatName"
      ref="input"
      @input="handleUpdateChatName"
      @blur="onEditChatName = false" />
    <div v-else>{{ chat.name }}</div>

    <DropdownMenu>
      <template #trigger>
        <Icon name="solar:menu-dots-bold" />
      </template>
      <template #content>
        <div
          @click="handleDeleteChat"
          class="w-full text-center px-4 py-1 rounded-sm hover:bg-slate-100 dark:hover:bg-slate-600 cursor-pointer">
          删除
        </div>
        <div
          @click="handleTurnOnEditMode"
          class="w-full text-center px-4 py-1 rounded-sm hover:bg-slate-100 dark:hover:bg-slate-600 cursor-pointer">
          重命名
        </div>
      </template>
    </DropdownMenu>
  </div>
</template>

<style scoped></style>
