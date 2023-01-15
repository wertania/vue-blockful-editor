<template>
  <!-- debug: show index -->
  <div v-if="debug">{{ "i: " + index }}</div>

  <!-- fixed position menu to add elemens -->
  <AddMenu :top="posMenuTop" :left="posMenuLeft" v-if="!readOnly && showAddMenu" @close="showAddMenu = false"
    @add="addItem($event)" :blocksToAdd="blocksToAdd" />

  <!-- fixed position menu to edit elemens -->
  <EditMenu :top="posMenuTop" :left="posMenuLeft" v-if="!readOnly && showEditMenu" @close="showEditMenu = false"
    @drop="emit('drop', true)" v-model="blockVar" :customEntriesEditMenu="customEntriesEditMenu" />

  <!-- MAIN ENTRY BLOCK in Editor Mode -->
  <div v-if="!readOnly" class="flex" :class="marginTop, marginBottom" @mouseover="toggleBlockButtons($event, true)"
    @mouseleave="toggleBlockButtons($event, false)">
    <!-- EDIT COLUMN -->
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
    <!-- BLOCK COLUMN -->
    <div class="w-11/12" :class="marginTop, marginBottom">
      <PluginWrapper v-for="plugin in plugins" :key="plugin.name" v-model="blockVar" :plugin="plugin"
        :readOnly="readOnly" :debug="debug" />
    </div>
  </div>

  <!-- MAIN ENTRY BLOCK in Viewer Mode -->
  <div v-else class="w-full">
    <PluginWrapper v-for="plugin in plugins" :key="plugin.name" v-model="blockVar" :plugin="plugin" :readOnly="readOnly"
      :debug="debug" />
  </div>

</template>

<script setup lang="ts">
import AddMenu from "./Menu/AddMenu.vue";
import EditMenu from "./Menu/EditMenu.vue";
import PluginWrapper from "./PluginWrapper.vue";
import { UniversalBlock } from "../../interfaces/page";
import { ref, watch, computed, Component } from "vue";
import { AddMenuEntry, EditMenuEntry } from "../../interfaces/menu";
import { BlockPlugin } from "../../interfaces/plugin";

const props = defineProps<{
  block: UniversalBlock;
  index: number;
  readOnly: boolean;
  plugins: BlockPlugin[];
  blocksToAdd: AddMenuEntry[];
  debug?: boolean;
  customEntriesEditMenu: EditMenuEntry[];
}>();

const emit = defineEmits(["add", "update", "drop"]);

const blockVar = ref(props.block);
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

const addItem = (type: string) => {
  showAddMenu.value = false;
  emit("add", { type, index: props.index }); // forward event to parent and close menu
};

// styling
const marginTop = computed(() => {
  let margin = 'm-0';
  if (blockVar.value.style?.spaceTop === 1) margin = 'mt-1';
  if (blockVar.value.style?.spaceTop === 2) margin = 'mt-2';
  if (blockVar.value.style?.spaceTop === 3) margin = 'mt-3';
  if (blockVar.value.style?.spaceTop === 4) margin = 'mt-4';
  if (blockVar.value.style?.spaceTop === 5) margin = 'mt-5';
  return margin;
});

const marginBottom = computed(() => {
  let margin = 'm-0';
  if (blockVar.value.style?.spaceBottom === 1) margin = 'mb-1';
  if (blockVar.value.style?.spaceBottom === 2) margin = 'mb-2';
  if (blockVar.value.style?.spaceBottom === 3) margin = 'mb-3';
  if (blockVar.value.style?.spaceBottom === 4) margin = 'mb-4';
  if (blockVar.value.style?.spaceBottom === 5) margin = 'mb-5';
  return margin;
});
</script>