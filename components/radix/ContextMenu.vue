<script setup lang="ts">
import { ContextMenuContent, ContextMenuItem, ContextMenuPortal, ContextMenuRoot, ContextMenuTrigger } from "radix-vue";

const props = defineProps<{
  chatId: string;
  contextMenu: {
    name: string;
    action: (chatId: string) => void;
  }[];
}>();
</script>

<template>
  <ContextMenuRoot>
    <ContextMenuTrigger as-child>
      <slot></slot>
    </ContextMenuTrigger>
    <ContextMenuPortal>
      <ContextMenuContent
        class="min-w-[220px] z-30 bg-white outline-none rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
        :side-offset="5"
      >
        <div v-for="item in contextMenu">
          <ContextMenuItem
            value="New Tab"
            class="group text-[13px] leading-none text-grass11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-green9 data-[highlighted]:text-green1"
            @click="item.action(chatId)"
          >
            {{ item.name }}
          </ContextMenuItem>
        </div>
      </ContextMenuContent>
    </ContextMenuPortal>
  </ContextMenuRoot>
</template>
