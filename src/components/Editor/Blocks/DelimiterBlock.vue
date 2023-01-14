<template>
  <div class="w-full border-t-2 m-5 mr-5 border-gray-600 ">
  </div>
</template>

<script setup lang="ts">
import { BlockDelimiter } from "../../../interfaces/blocks";

const props = defineProps<{
  readOnly: Boolean;
  modelValue: BlockDelimiter;
}>();
</script>