import type { Chat } from "@/types/chat";
import { getContent } from "@/utils/index";
import { nanoid } from "nanoid";
import { defineStore, createPinia, skipHydrate } from "pinia";
import { get, useLocalStorage } from "@vueuse/core";

// 你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useChatStore = defineStore("chats", () => {
  const noChatModelId = ref("gpt-3.5-turbo");
  const currentChatId = ref(useLocalStorage("currentChatId", ""));
  const chats = ref<Ref<Chat[]>>(useLocalStorage("chats", []));

  const currentChat = computed(() => {
    return chats.value.find((chat) => chat.id === currentChatId.value);
  });

  function setCurrentChatId(chatId: string) {
    currentChatId.value = chatId;
  }

  function addNewChat(modelId: string = "gpt-3.5-turbo") {
    const chatId = nanoid();
    const newChat: Chat = {
      id: chatId,
      name: "new chat",
      modelId,
      messages: [],
      // inputText: "",
      generating: false,
    };
    chats.value.push(newChat);
    return chatId;
  }

  function deleteChat(chatId: string) {
    chats.value = chats.value.filter((chat) => chat.id !== chatId);
  }

  function updateChat(chatId: string, updateFiled: Partial<Chat>) {
    const chat = chats.value.find((chat) => chat.id === chatId);
    if (chat) {
      Object.assign(chat, updateFiled);
    }
  }

  function setNoChatModelId(modelId: string) {
    noChatModelId.value = modelId;
  }

  async function sendMessage(chatId: string, message: string) {
    const chat = chats.value.find((chat) => chat.id === chatId);

    const isFirstMessage = chat?.messages.length === 0;
    if (isFirstMessage) {
      updateChat(chatId, { name: message.slice(0, 20) });
    }

    if (chat) {
      chat.messages.push({
        role: "user",
        content: message,
        date: new Date().toISOString(),
      });
      // chat.inputText = "";
      const historyMessages = chat.messages.map((message) => ({
        role: message.role,
        content: message.content,
      }));
      const newMessage = {
        role: "assistant",
        content: "",
        modelId: chat.modelId,
        date: new Date().toISOString(),
      };
      chat.messages.push(newMessage);
      // 将 genarating 设置为 true，表示正在生成中
      chat.generating = true;
      // 调用后端接口
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            modelId: chat.modelId,
            messages: historyMessages,
          }),
        });
        const reader = response.body?.getReader();
        if (reader) {
          const decoder = new TextDecoder();
          while (chat.generating) {
            const { done, value } = await reader.read();
            console.log('%c [ value ]-97', 'font-size:13px; background:pink; color:#bf2c9f;', value)
            if (done) {
              chat.generating = false;
              console.log("%c [ done ]", done);
              console.log("%c [ done ]", done + "");
              break;
            }
            const { text } = getContent(decoder.decode(value));
            chat.messages[chat.messages.length - 1].content += text;
          }
        }
      } catch (error) {
        console.log("%c [ error ]", error);
        chat.messages.pop();
        chat.generating = false;
      }
    }
  }

  return {
    noChatModelId,
    currentChatId: skipHydrate(currentChatId),
    chats: skipHydrate(chats),
    currentChat,
    setCurrentChatId,
    addNewChat,
    deleteChat,
    updateChat,
    setNoChatModelId,
    sendMessage,
  };
});
