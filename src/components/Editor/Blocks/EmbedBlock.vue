<template>
  <div class="w-full">
    <iframe :src="modelValue.data.src" />
  </div>
</template>

<script setup lang="ts">
import { BlockEmbed } from "../../../interfaces/blocks";

const props = defineProps<{
  readOnly: Boolean;
  modelValue: BlockEmbed;
}>();
</script>