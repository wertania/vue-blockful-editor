<template>
  <ul class="max-w-md space-y-1 text-gray-500 list-inside">
    <!-- level -->
    <li class="flex items-center">
      <span class="ml-2 text-sm">{{ 'Columns' }}</span>
      <i
        class="text-sm cursor-pointer rounded-xl bg-gray-200 p-[3px] hover:bg-gray-100 ml-3"
        @click="updateColumnCount(1)"
        >1</i
      >
      <i
        class="text-sm cursor-pointer rounded-xl bg-gray-200 p-[3px] hover:bg-gray-100 ml-1"
        @click="updateColumnCount(2)"
        >2</i
      >
      <i
        class="text-sm cursor-pointer rounded-xl bg-gray-200 p-[3px] hover:bg-gray-100 ml-1"
        @click="updateColumnCount(3)"
        >3</i
      >
      <i
        class="text-sm cursor-pointer rounded-xl bg-gray-200 p-[3px] hover:bg-gray-100 ml-1"
        @click="updateColumnCount(4)"
        >4</i
      >
      <i
        class="text-sm cursor-pointer rounded-xl bg-gray-200 p-[3px] hover:bg-gray-100 ml-1"
        @click="updateColumnCount(5)"
        >5</i
      >
      <i
        class="text-sm cursor-pointer rounded-xl bg-gray-200 p-[3px] hover:bg-gray-100 ml-1"
        @click="updateColumnCount(6)"
        >6</i
      >
    </li>
  </ul>
</template>

<script setup lang="ts">
import { UniversalBlock } from '../../../interfaces/page';

const props = defineProps<{
  modelValue: UniversalBlock;
}>();

const updateColumnCount = (count: number) => {
  const colCount = props.modelValue.data.columns.length;
  // if colCount greater than count, remove columns
  if (colCount > count) {
    props.modelValue.data.columns.splice(count, colCount - count);
  }
  // if colCount smaller than count, add empty columns
  else {
    for (let i = colCount; i < count; i++) {
      props.modelValue.data.columns.push({
        type: 'column',
        data: {
          blocks: [],
        },
      });
    }
  }
  // else if colCount equal count, do nothing
};
</script>
