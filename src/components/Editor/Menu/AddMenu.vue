<template>
  <div class="fixed left-10 shadow-md bg-white w-[150px] rounded-md p-2 custom-top">
    <h6 class="mb-2 font-semibold text-gray-900 dark:text-white">
      {{ "Elements" }}
    </h6>
    <ul class="max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
      <li v-for="item of items" :key="item.value" class="flex items-center hover:bg-gray-100 cursor-pointer"
        @click="$emit('add', item.value)">
        <i class="fa-solid text-2xl" :class="item.icon" />
        <span class="ml-2 text-sm">{{ item.label }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

defineEmits(["add", "close"]);

const props = defineProps<{
  top: number;
  left: number;
}>();

const topPx = computed(() => `${props.top}px`);
const leftPx = computed(() => `${props.left}px`);

const items = [
  {
    icon: "fa-heading",
    label: "Header",
    value: "header",
  },
  {
    icon: "fa-font",
    label: "Paragraph",
    value: "paragraph",
  },
  {
    icon: "fa-anchor",
    label: "iframe",
    value: "iframe",
  },
];
</script>

<style scoped>
.custom-top {
  top: v-bind(topPx);
  left: v-bind(leftPx);
}
</style>