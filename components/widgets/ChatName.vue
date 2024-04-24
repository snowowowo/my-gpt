<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Chat } from "@/types/chat";
import { useChatStore } from "@/stores/chats";
const chatStore = useChatStore();
const { currentChatId } = storeToRefs(chatStore);
const props = defineProps<{
  chat: Chat;
}>();

const inputText = ref<string>(props.chat.name);
const input = ref<HTMLInputElement | null>(null);
const onEditChatName = ref(false);

function handleDeleteChat() {
  chatStore.deleteChat(props.chat.id);
}

function handleOnEditMode() {
  onEditChatName.value = true;
  nextTick(() => {
    if (input.value) {
      input.value.focus();
    }
  });
}

function handleUpdateChatName() {
  chatStore.updateChat(props.chat.id, { name: inputText.value });
  // onEditChatName.value = false;
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
      v-model="inputText"
      ref="input"
      @input="handleUpdateChatName" />
    <div v-else>{{ chat.name }}</div>
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Icon name="solar:menu-dots-bold" />
      </DropdownMenuTrigger>
      <DropdownMenuContent :hideWhenDetached="false">
        <DropdownMenuItem @click="handleDeleteChat">删除</DropdownMenuItem>
        <DropdownMenuItem @click="handleOnEditMode">重命名</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>

<style scoped></style>
