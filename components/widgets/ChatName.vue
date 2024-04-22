<script setup lang="ts">
import type { Chat } from "@/types/chat";
const props = defineProps<{
  chat: Chat;
}>();
const emit = defineEmits(["updateChatInfoFromLeftSide"]);

const onEditing = ref<boolean>(false);
const inputRef = ref<HTMLInputElement>();

function handleEditChatName() {
  onEditing.value = true;
  console.log("%c [ inputRef.value ]-13", "font-size:13px; background:pink; color:#bf2c9f;", inputRef.value);
  inputRef.value?.focus();
  console.log("edit chat name");
}

function handleInputBlur() {
  onEditing.value = false;
  console.log("handleInputBlur");
  emit("updateChatInfoFromLeftSide", {
    currentChatId: props.chat.id,
    chatName: inputRef.value?.value || "",
  });
}
</script>

<template>
  <div class="w-full h-full flex justify-between items-center">
    <div v-if="!onEditing">{{ chat.name }}</div>
    <input
      v-else
      type="text"
      :value="chat.name"
      class="outline-none bg-transparent"
      :disabled="!onEditing"
      ref="inputRef"
      @blur="handleInputBlur"
    />
    <!-- <div class="" @click="handleEditChatName">...</div> -->
  </div>
</template>

<style scoped></style>
