<template>
  <div class="w-full">
    <iframe :src="modelValue.data.src" />
  </div>
</template>

<script setup lang="ts">
import { BlockEmbed } from "../../../interfaces/blocks";
import { watch, ref } from "vue";
const props = defineProps<{
  readOnly: Boolean;
  modelValue: BlockEmbed;
}>();
const src = ref(props.modelValue.data.src);

watch(props, () => {
  src.value = props.modelValue.data.src;
});
</script>