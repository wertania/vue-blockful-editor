<template>
  <div class="w-full">
    <img :src="modelValue.data.src" />
  </div>
</template>

<script setup lang="ts">
import { BlockImage } from "../../../interfaces/blocks";

const props = defineProps<{
  readOnly: Boolean;
  modelValue: BlockImage;
}>();
</script>