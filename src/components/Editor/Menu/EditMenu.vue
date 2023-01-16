<template>
  <div ref="editMenu" class="fixed left-10 shadow-md bg-white w-[250px] rounded-md p-2 z-50 custom-top">
    <h6 class="mb-2 font-semibold text-gray-900 dark:text-white">
      {{ "Edit" }}
    </h6>
    <!-- <MenuParamsEmbedBlock v-if="modelValue.type === 'embed'" v-model="<BlockEmbed>block" />
    <MenuParamsParagraphBlock v-else-if="modelValue.type === 'paragraph'" v-model="<BlockParagraph>block" />
    <MenuParamsHeaderBlock v-else-if="modelValue.type === 'header'" v-model="<BlockHeader>block" />
    <MenuParamsImageBlock v-else-if="modelValue.type === 'image'" v-model="<BlockImage>block" /> -->



    <!-- custom entries -->
    <div v-for="entry in customEntriesEditMenu" :key="entry.name">
      <component v-if="entry.name === modelValue.type" :is="entry.template" v-model="block" />
    </div>

    <!-- delete button -->
    <div class="bg-gray-200 hover:bg-gray-100 rounded cursor-pointer p-1 text-sm mt-2" @click="emit('drop', true)">
      <i class="fa-solid fa-trash"></i>
      <span class="ml-2">{{ "Delete"}}</span>
    </div>

    <!-- close button -->
    <MenuButton label="Close" @click="emit('close', true)" />

  </div>
</template>

<script setup lang="ts">
import { computed, ref, onUnmounted, onMounted } from "vue";
import { EditMenuEntry } from "../../../interfaces/menu";
import { UniversalBlock } from "../../../interfaces/page";
import MenuButton from "./MenuButton.vue";

const emit = defineEmits(["close", "drop"]);

const props = defineProps<{
  top: number;
  left: number;
  modelValue: UniversalBlock;
  customEntriesEditMenu: EditMenuEntry[]; // custom entries to render
}>();

const block = ref(props.modelValue);

// self style
const editMenu = ref(null);

const topPx = computed(() => {
  if (editMenu.value != null) {
    const wH = window.innerHeight;
    const menu: HTMLElement = editMenu.value;
    if ((props.top + menu.offsetHeight) > window.innerHeight) {
      return `${window.innerHeight - menu.offsetHeight}px`;
    } else {
      return `${props.top}px`
    }
  }
});
const leftPx = computed(() => `${props.left}px`);

// close menu
let loaded = false; // orevent first click
const handleOutsieClick = (event: any) => {
  // console.log(event);
  // console.log(loaded);
  if (loaded) {
    event.stopPropagation();
    emit("close", true);
  }
  loaded = true;
};

// onMounted(() => {
//   document.body.addEventListener('click', handleOutsieClick);
// });

// onUnmounted(() => {
//   document.body.removeEventListener('click', handleOutsieClick);
// });
window.onscroll = function () {
  emit("close", true);
}
</script>

<style scoped>
.custom-top {
  top: v-bind(topPx);
  left: v-bind(leftPx);
}
</style>