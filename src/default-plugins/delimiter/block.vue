<template>
    <div class="w-[90%] border-t-2 m-auto border-gray-600 ">
    </div>
</template>

<script setup lang="ts">
// import { watch } from "vue";
import { BlockDelimiter } from "./types";
const props = defineProps<{
    readOnly: boolean;
    modelValue: BlockDelimiter;
}>();
// watch(props, () => {
//   // nothing to do
// });
</script>