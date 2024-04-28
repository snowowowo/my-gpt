<script setup lang="ts">
import { getModelNameByModelId } from "@/utils/index";
import { useUiStore } from "@/stores/ui";
import { useChatStore } from "@/stores/chats";
const uiStore = useUiStore();
const chatStore = useChatStore();
const { currentChatId, currentChat, noChatModelId } = storeToRefs(chatStore);
const { showSidebar } = storeToRefs(uiStore);

interface Model {
  id: string;
  name: string;
  description: string;
}

const props = defineProps<{
  showNavbar: boolean;
}>();

const modelList = ref<Model[]>([
  {
    id: "gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    description: "GPT-3.5.",
  },
  {
    id: "gpt-3.5-turbo-1106",
    name: "GPT-3.5 Turbo 1106",
    description: "最新 gpt-3.5-turbo-1106 模型.",
  },
  {
    id: "gpt-4",
    name: "GPT-4",
    description: "GPT-4.",
  },
  {
    id: "gpt-4-all",
    name: "GPT-4 All",
    description:
      "官方最新的 gpt-4-turbo（知识库到 2023 年 4 月）、联网、多模态识别分析图片、生成图片.",
  },
  {
    id: "gemini-pro",
    name: "Gemini Pro",
    description: "谷歌 Gemini.",
  },
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

function handleSetContextLength(contextLength: number) {
  if (currentChatId.value) {
    chatStore.updateChat(currentChatId.value, { contextLength });
  }
}
</script>

<template>
  <div
    class="sticky top-0 left-0 flex gap-x-3 items-center justify-start w-full px-4 transition border-b bg-white/60 h-14 dark:bg-slate-900/60 backdrop-blur-sm text-slate-700 dark:text-slate-200 dark:border-slate-700"
    v-show="showNavbar">
    <!-- 侧边栏按钮 -->
    <div
      v-if="!showSidebar"
      class="flex items-center justify-center w-10 h-10 mr-2 cursor-pointer rounded-xl hover:bg-gray-400/20"
      @click="handleShowSidebar">
      <Icon name="system-uicons:push-right" />
    </div>
    <!-- 模型 -->
    <div>
      <DropdownMenu>
        <template #trigger>
          <div class="flex justify-center items-center">
            <div class="flex items-center justify-center w-10 h-10 rounded-xl">
              <Icon name="carbon:model-alt" />
            </div>
            <div class="cursor-pointer">
              {{
                (currentChat?.modelId &&
                  getModelNameByModelId(currentChat?.modelId)) ||
                (noChatModelId && getModelNameByModelId(noChatModelId))
              }}
            </div>
          </div>
        </template>
        <template #content>
          <div
            v-for="model in modelList"
            @click="handleSetModel(model.id)"
            class="w-full py-2 text-start px-4 rounded-sm hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer flex flex-row justify-start items-center">
            <div class="w-8 h-8 flex justify-center items-center">
              <Icon
                v-if="(currentChat?.modelId || noChatModelId) === model.id"
                name="mdi:dot"
                class="w-8 h-8 text-green-500 dark:text-green-700" />
            </div>
            <div class="flex flex-col justify-center items-start gap-y-1">
              <div>{{ getModelNameByModelId(model.id) }}</div>
              <div class="text-xs w-60 text-gray-400text-wrap">
                {{ model.description }}
              </div>
            </div>
          </div>
        </template>
      </DropdownMenu>
    </div>
    <!-- 上下文长度设置 -->
    <div>
      <DropdownMenu>
        <template #trigger>
          <div class="flex justify-center items-center">
            <div class="flex items-center justify-center w-10 h-10 rounded-xl">
              <Icon name="fluent-mdl2:context-menu" />
            </div>
            <div class="cursor-pointer">
              {{
                (currentChat?.contextLength && currentChat?.contextLength) || 1
              }}
            </div>
          </div>
        </template>
        <template #content>
          <div
            @click="handleSetContextLength(1)"
            class="w-full py-2 text-start px-4 rounded-sm hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer flex flex-row justify-start items-center">
            <div class="w-8 h-8 flex justify-center items-center">
              <Icon
                v-if="currentChat?.contextLength === 1"
                name="mdi:dot"
                class="w-8 h-8 text-green-500 dark:text-green-700" />
            </div>
            <div class="flex flex-col justify-center items-start gap-y-1">
              <div class="font-black">1</div>
              <div class="text-xs w-60 text-gray-400text-wrap">
                如过只需要让AI知道最新发给它的一条消息，设为1可节省token.
              </div>
            </div>
          </div>
          <div
            @click="handleSetContextLength(10)"
            class="w-full py-2 text-start px-4 rounded-sm hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer flex flex-row justify-start items-center">
            <div class="w-8 h-8 flex justify-center items-center">
              <Icon
                v-if="currentChat?.contextLength === 10"
                name="mdi:dot"
                class="w-8 h-8 text-green-500 dark:text-green-700" />
            </div>
            <div class="flex flex-col justify-center items-start gap-y-1">
              <div class="font-black">10</div>
              <div class="text-xs w-60 text-gray-400text-wrap">
                一般上下文长度越大，回答越好，消耗的token也越多，设为10可以让AI知道最近10条消息.
              </div>
            </div>
          </div>
        </template>
      </DropdownMenu>
    </div>
  </div>
</template>

<style scoped></style>
