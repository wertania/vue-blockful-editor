<template>
  <div ref="addMenu" class="fixed left-10 shadow-md bg-white w-[150px] rounded-md p-2 z-50 text-gray-600 custom-top">

    <!--TITLE -->
    <h6 class="mb-2 font-semibold text-gray-900 dark:text-white">
      {{ "Elements" }}
    </h6>

    <!-- ENTRIES THAT CAN BE ADDED -->
    <div v-for="item of blocksToAdd" :key="item.value" class="flex hover:bg-gray-100 cursor-pointer"
      @click="$emit('add', item.value)">
      <i class="w-2/6 text-sm" :class="item.icon" />
      <span class="w-4/6 text-sm">{{ item.label }}</span>
    </div>

    <!-- CLOSE BUTTON -->
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
  blocksToAdd: { label: string; value: string; icon: string; }[];
}>();
const addMenu = ref<HTMLElement | null>(null);

const startPosition = props.top;
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

// close menu when click outside
let loaded = false; // orevent first click
const handleOutsieClick = (event: any) => {
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