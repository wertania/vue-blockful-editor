<template>
  <div class="w-[90%] border-t-2 m-auto border-gray-600 ">
  </div>
</template>

<script setup lang="ts">
import { BlockDelimiter } from "../../../interfaces/blocks";
import { watch } from "vue";
const props = defineProps<{
  readOnly: Boolean;
  modelValue: BlockDelimiter;
}>();
// watch(props, () => {
//   // nothing to do
// });
</script>