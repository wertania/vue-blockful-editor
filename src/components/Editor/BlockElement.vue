<template>
  <div v-if="debug">{{ "i: " + index }}</div>

  <AddMenu :top="posMenuTop" :left="posMenuLeft" v-if="showAddMenu" @close="showAddMenu = false"
    @add="addItem($event)" />

  <EditMenu :top="posMenuTop" :left="posMenuLeft" v-if="showEditMenu" @close="showEditMenu = false"
    @drop="emit('drop', true)" v-model="blockVar" />

  <!-- MAIN ENTRY BLOCK -->
  <div class="flex" :class="{
    'mb-1': blockVar.style.spaceBottom === 1,
    'mb-2': blockVar.style.spaceBottom === 2,
    'mb-3': blockVar.style.spaceBottom === 3,
    'mb-4': blockVar.style.spaceBottom === 4,
    'mb-5': blockVar.style.spaceBottom === 5,
    'mb-6': blockVar.style.spaceBottom === 6,
    'mt-1': blockVar.style.spaceTop === 1,
    'mt-2': blockVar.style.spaceTop === 2,
    'mt-3': blockVar.style.spaceTop === 3,
    'mt-4': blockVar.style.spaceTop === 4,
    'mt-5': blockVar.style.spaceTop === 5,
    'mt-6': blockVar.style.spaceTop === 6,
  }" @mouseover="toggleBlockButtons($event, true)" @mouseleave="toggleBlockButtons($event, false)">
    <!-- TOOLBAR -->
    <div class="w-1/12 flex items-center h-5">
      <i class="fa-solid fa-plus text-xl w-18 hover:bg-gray-200 hover:rounded" v-if="showBlockButtons"
        @click="openAddMenu($event)" />
      <i class="
          fa-solid fa-wrench
          text-xl
          w-18
          ml-1
          hover:bg-gray-200 hover:rounded
        " v-if="showBlockButtons" @click="openEditMenu($event)" />
    </div>
    <!-- BLOCK -->
    <div :class="{ 'w-11/12': readOnly, 'w-full': !readOnly }">
      <HeaderBlock v-if="blockVar.type === 'header'" v-model="<BlockHeader>blockVar" :readOnly="false" />
      <ParagraphBlock v-else-if="blockVar.type === 'paragraph'" v-model="<BlockParagraph>blockVar" :readOnly="false" />
      <ImageBlock v-else-if="blockVar.type === 'image'" v-model="<BlockImage>blockVar" :readOnly="false" />
      <EmbedBlock v-else-if="blockVar.type === 'embed'" v-model="<BlockEmbed>blockVar" :readOnly="false" />
      <DelimiterBlock v-else-if="blockVar.type === 'delimiter'" v-model="<BlockDelimiter>blockVar" :readOnly="false" />
    </div>
  </div>
</template>

<script setup lang="ts">
import AddMenu from "./Menu/AddMenu.vue";
import EditMenu from "./Menu/EditMenu.vue";
import ParagraphBlock from "./Blocks/ParagraphBlock.vue";
import HeaderBlock from "./Blocks/HeaderBlock.vue";
import ImageBlock from "./Blocks/ImageBlock.vue";
import EmbedBlock from "./Blocks/EmbedBlock.vue";
import DelimiterBlock from "./Blocks/DelimiterBlock.vue";

import { Block, BlockDelimiter, BlockEmbed, BlockHeader, BlockImage, BlockParagraph, BlockType } from "./../../interfaces/blocks";
import { ref, watch } from "vue";

const props = defineProps<{
  block: Block;
  index: number;
  readOnly: boolean;
  debug?: boolean;
}>();
const blockVar = ref(props.block);

const emit = defineEmits(["add", "update", "drop"]);

// v-model
watch(blockVar, () => {
  emit('update', { block: blockVar.value });
});
watch(props, () => {
  blockVar.value = props.block;
});

// Menus
const showBlockButtons = ref(false);
const showAddMenu = ref(false);
const showEditMenu = ref(false);
const posMenuTop = ref(0);
const posMenuLeft = ref(0);

const toggleBlockButtons = (e: MouseEvent, val?: boolean) => {
  if (val != null) (showBlockButtons.value = val);
  else showBlockButtons.value = !showBlockButtons.value;
};

const openAddMenu = (e: MouseEvent) => {
  const node = e.target as HTMLElement;
  const { bottom, left } = node.getBoundingClientRect();
  posMenuTop.value = bottom;
  posMenuLeft.value = left;
  showAddMenu.value = true;
};

const openEditMenu = (e: MouseEvent) => {
  const node = e.target as HTMLElement;
  const { bottom, left } = node.getBoundingClientRect();
  posMenuTop.value = bottom;
  posMenuLeft.value = left;
  showEditMenu.value = true;
};

const addItem = (type: BlockType) => {
  // forward event to parent and close menu
  showAddMenu.value = false;
  emit("add", { type, index: props.index });
};
</script>