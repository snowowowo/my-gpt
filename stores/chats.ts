import type { Chat } from "@/types/chat";
import { getContent } from "@/utils/index";
import { nanoid } from "nanoid";
import { defineStore } from "pinia";
// 你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useChatStore = defineStore("chat", {
  // 其他配置...
  state: () => ({
    noChatModelId: "gpt-3.5-turbo",
    currentChatId: "",
    chats: [] as Chat[],
  }),
  getters: {
    // 其他 getter...
    currentChat: (state) =>
      state.chats.find((chat) => chat.id === state.currentChatId),
  },
  actions: {
    // 其他方法...
    // addNewChat(chat: Chat) {
    //   this.chats.push(chat);
    // },
    addNewChat(modelId: string = "gpt-3.5-turbo") {
      const chatId = nanoid();
      const newChat: Chat = {
        id: chatId,
        name: "New Chat",
        modelId,
        messages: [],
        inputText: "",
      };
      this.chats.push(newChat);
      return chatId;
    },
    deleteChat(chatId: string) {
      this.chats = this.chats.filter((chat) => chat.id !== chatId);
    },
    updateChat(chatId: string, updateFiled: Partial<Chat>) {
      const chat = this.chats.find((chat) => chat.id === chatId);
      if (chat) {
        Object.assign(chat, updateFiled);
      }
    },
    setNoChatModelId(modelId: string) {
      this.noChatModelId = modelId;
    },
    async sendMessage(chatId: string, message: string) {
      const chat = this.chats.find((chat) => chat.id === chatId);
      if (chat) {
        chat.messages.push({ role: "user", content: message });
        chat.inputText = "";
        const historyMessages = [...chat.messages];
        const newMessage = { role: "assistant", content: "" };
        chat.messages.push(newMessage);
        // 调用后端接口
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
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              break;
            }
            const { text } = getContent(decoder.decode(value));
            chat.messages[chat.messages.length - 1].content += text;
          }
        }
      }
    },
    // currentChatId
    setCurrentChatId(chatId: string) {
      this.currentChatId = chatId;
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
