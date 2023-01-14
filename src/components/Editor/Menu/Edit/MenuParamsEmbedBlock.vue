<template>
  <ul class="max-w-md space-y-1 text-gray-500 list-inside">
    <li class="flex items-center hover:bg-gray-100 cursor-pointer">
      <i class="fa-solid fa-font text-2xl" />
      <span class="ml-2 text-sm">{{ "custom.entry" }}</span>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { Block } from "./../../../../interfaces/blocks";

const props = defineProps<{
  modelValue: Block;
}>();
</script>