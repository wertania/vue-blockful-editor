<template>
  <div ref="addMenu" class="fixed left-10 shadow-md bg-white w-[150px] rounded-md p-2 custom-top">
    <h6 class="mb-2 font-semibold text-gray-900 dark:text-white">
      {{ "Elements" }}
    </h6>
    <ul class="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
      <li v-for="item of items" :key="item.value" class="flex items-center hover:bg-gray-100 cursor-pointer"
        @click="$emit('add', item.value)">
        <i class="text-2xl" :class="item.icon" />
        <span class="ml-2 text-sm">{{ item.label }}</span>
      </li>
    </ul>

    <div class="bg-gray-200 hover:bg-gray-100 rounded cursor-pointer p-1 text-sm mt-2" @click="emit('close', true)">
      <i class="fa-solid fa-ban"></i>
      <span class="ml-2">{{ "Close"}}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";

const emit = defineEmits(["add", "close"]);

// calculate position
const props = defineProps<{
  top: number;
  left: number;
}>();
const addMenu = ref<HTMLElement | null>(null);

const topPx = computed(() => {
  if (addMenu.value != null) {
    const wH = window.innerHeight;
    const menu: HTMLElement = addMenu.value;
    if ((props.top + menu.offsetHeight) > window.innerHeight) {
      return `${window.innerHeight - menu.offsetHeight}px`;
    } else {
      return `${props.top}px`
    }
  }
});
const leftPx = computed(() => `${props.left}px`);

// define menu items
const items = [
  {
    icon: "fa-solid fa-heading",
    label: "Header",
    value: "header",
  },
  {
    icon: "fa-solid fa-font",
    label: "Paragraph",
    value: "paragraph",
  },
  {
    icon: "fa-solid fa-anchor",
    label: "iframe",
    value: "iframe",
  },
  {
    icon: "fa-solid fa-minus",
    label: "Delimiter",
    value: "delimiter",
  },
];

// close menu when click outside
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

onMounted(() => {
  document.body.addEventListener('click', handleOutsieClick);
});

onUnmounted(() => {
  document.body.removeEventListener('click', handleOutsieClick);
});
</script>

<style scoped>
.custom-top {
  top: v-bind(topPx);
  left: v-bind(leftPx);
}
</style>