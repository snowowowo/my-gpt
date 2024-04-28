import type { Chat, Message } from "@/types/chat";
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
      // generating: false,
      status: "idle",
      contextLength: 10,
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

  // 添加消息
  function addUserMessage(chatId: string, message: string) {
    const chat = chats.value.find((chat) => chat.id === chatId);
    if (chat) {
      chat.messages.push({
        role: "user",
        content: message,
        date: new Date().toISOString(),
      });
    }
  }

  function addAssistantMessage(chatId: string) {
    const chat = chats.value.find((chat) => chat.id === chatId);
    if (chat) {
      chat.messages.push({
        role: "assistant",
        content: "",
        date: new Date().toISOString(),
      });
    }
  }

  async function sendMessage(chatId: string) {
    const chat = chats.value.find((chat) => chat.id === chatId);

    const isFirstMessage = chat?.messages.length === 2;
    if (isFirstMessage) {
      updateChat(chatId, { name: chat.messages[0].content.slice(0, 20) });
    }

    // 如果上一条消息是错误消息，清空上一条消息
    if (chat?.status === "error") {
      chat.messages[chat.messages.length - 1].content = "";
    }

    if (chat) {
      // console.log('%c [ chat ]-91', 'font-size:13px; background:pink; color:#bf2c9f;', chat.messages)
      
      // 根据 contextLength 获取上下文
      const historyMessages = chat.messages
        .slice(0, chat.messages.length - 1)
        .slice(-chat.contextLength)
        .map((message) => ({
          role: message.role,
          content: message.content,
        }));
      chat.status = "generating";

      // 调用后端接口
      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: chat.modelId,
            messages: historyMessages,
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const reader = response.body?.getReader();
        if (reader) {
          const decoder = new TextDecoder();
          while (chat.status === "generating") {
            const { done, value } = await reader.read();
            if (done) {
              chat.status = "finished";
            } else {
              const { text } = getContent(decoder.decode(value));
              chat.messages[chat.messages.length - 1].content += text;
            }
          }
        }
      } catch (error) {
        console.log("[ error ]", error);
        chat.status = "error";
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
    addUserMessage,
    addAssistantMessage,
    sendMessage,
  };
});
