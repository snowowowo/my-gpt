<script setup lang="ts">
import type { Chat, Message } from "@/types/chat";

interface ApiResponse {
  choices: { message: Message }[];
}

const chatList = ref<Chat[]>([
  {
    id: "1",
    name: "Chat",
    messages: [],
  },
]);
const currentChatId = ref<string | null>(null);

const currentChat = computed(() => {
  return chatList.value.find((chat) => chat.id === currentChatId.value);
});

async function handleSendMessage(event: { currentChatId: string | null; message: string }) {
  console.log("%c [ handleSendMessage ]-42", "font-size:13px; background:pink; color:#bf2c9f;", event);
  if (!event.currentChatId) return;
  const chat = chatList.value.find((chat) => chat.id === event.currentChatId);
  if (!chat) return;
  chat.messages.push({
    role: "user",
    content: event.message,
  });
  //
  try {
    const { data } = (await $fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({
        modelId: "gpt-3.5-turbo",
        messages: chat.messages,
      }),
    })) as { data: ApiResponse };
    console.log("%c [ data ]-29", "font-size:13px; background:pink; color:#bf2c9f;", data);
    const message = data.choices[0].message;
    console.log("%c [ message ]-41", "font-size:13px; background:pink; color:#bf2c9f;", message);
    chat.messages.push(message);
  } catch (error) {
    console.log("%c [ error ]-39", "font-size:13px; background:pink; color:#bf2c9f;", error);
  }
}
</script>

<template>
  <div class="w-screen h-screen">
    <div class="w-full h-full flex flex-row justify-center items-center">
      <LeftSide
        :chatList="chatList"
        :currentChatId="currentChatId"
        @selectChat="currentChatId = $event"
        :class="'h-full bg-blue-200 hidden ' + 'md:block md:w-[300px]'"
      ></LeftSide>
      <RigtSide
        :chatList="chatList"
        :currentChatId="currentChatId"
        @sendMessage="handleSendMessage"
        class="flex-1 h-full bg-red-200"
      ></RigtSide>
    </div>
  </div>
</template>

<style scoped></style>
