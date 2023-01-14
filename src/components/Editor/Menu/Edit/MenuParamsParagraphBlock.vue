<template>
  <ul class="max-w-md space-y-1 text-gray-500 list-inside">
    <!-- text align -->
    <li class="flex items-center">
      <span class="ml-2 text-sm">{{ "Align" }}</span>
      <i class="fa-solid fa-align-left text-2xl cursor-pointer hover:bg-gray-100 ml-3"
        @click="modelValue.data.textAlign = 'left'" />
      <i class="fa-solid fa-align-center text-2xl cursor-pointer hover:bg-gray-100 ml-1"
        @click="modelValue.data.textAlign = 'center'" />
      <i class="fa-solid fa-align-right text-2xl cursor-pointer hover:bg-gray-100 ml-1"
        @click="modelValue.data.textAlign = 'right'" />
    </li>
    <!-- font size -->
    <li class="flex items-center">
      <span class="ml-2 text-sm">{{ "Size" }}</span>
      <i class="text-sm cursor-pointer rounded-xl bg-gray-200 p-[3px] hover:bg-gray-100 ml-3"
        @click="modelValue.data.fontSize = '0.8em'">1</i>
      <i class="text-sm cursor-pointer rounded-xl bg-gray-200 p-[3px] hover:bg-gray-100 ml-1"
        @click="modelValue.data.fontSize = '1em'">2</i>
      <i class="text-sm cursor-pointer rounded-xl bg-gray-200 p-[3px] hover:bg-gray-100 ml-1"
        @click="modelValue.data.fontSize = '1.2em'">3</i>
      <i class="text-sm cursor-pointer rounded-xl bg-gray-200 p-[3px] hover:bg-gray-100 ml-1"
        @click="modelValue.data.fontSize = '1.4em'">4</i>
      <i class="text-sm cursor-pointer rounded-xl bg-gray-200 p-[3px] hover:bg-gray-100 ml-1"
        @click="modelValue.data.fontSize = '2em'">5</i>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { BlockParagraph } from "./../../../../interfaces/blocks";

const props = defineProps<{
  modelValue: BlockParagraph;
}>();
</script>