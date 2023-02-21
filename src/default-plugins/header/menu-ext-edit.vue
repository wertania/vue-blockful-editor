<template>
  <ul class="max-w-md space-y-1 text-gray-500 list-inside">
    <!-- text align -->
    <li class="flex items-center">
      <span class="ml-2 text-sm">{{ 'Align' }}</span>
      <i
        class="fa-solid fa-align-left text-2xl cursor-pointer hover:bg-gray-100 ml-3"
        @click="modelValue.data.textAlign = 'left'"
      />
      <i
        class="fa-solid fa-align-center text-2xl cursor-pointer hover:bg-gray-100 ml-1"
        @click="modelValue.data.textAlign = 'center'"
      />
      <i
        class="fa-solid fa-align-right text-2xl cursor-pointer hover:bg-gray-100 ml-1"
        @click="modelValue.data.textAlign = 'right'"
      />
    </li>
    <!-- level -->
    <li class="flex items-center">
      <span class="ml-2 text-sm">{{ 'Level' }}</span>
      <i
        class="text-sm cursor-pointer rounded-xl bg-gray-200 p-[3px] hover:bg-gray-100 ml-3"
        @click="modelValue.data.level = 1"
        >1</i
      >
      <i
        class="text-sm cursor-pointer rounded-xl bg-gray-200 p-[3px] hover:bg-gray-100 ml-1"
        @click="modelValue.data.level = 2"
        >2</i
      >
      <i
        class="text-sm cursor-pointer rounded-xl bg-gray-200 p-[3px] hover:bg-gray-100 ml-1"
        @click="modelValue.data.level = 3"
        >3</i
      >
      <i
        class="text-sm cursor-pointer rounded-xl bg-gray-200 p-[3px] hover:bg-gray-100 ml-1"
        @click="modelValue.data.level = 4"
        >4</i
      >
      <i
        class="text-sm cursor-pointer rounded-xl bg-gray-200 p-[3px] hover:bg-gray-100 ml-1"
        @click="modelValue.data.level = 5"
        >5</i
      >
      <i
        class="text-sm cursor-pointer rounded-xl bg-gray-200 p-[3px] hover:bg-gray-100 ml-1"
        @click="modelValue.data.level = 6"
        >6</i
      >
    </li>
  </ul>
</template>

<script setup lang="ts">
import { BlockHeader } from './types';

const props = defineProps<{
  modelValue: BlockHeader;
}>();
</script>
