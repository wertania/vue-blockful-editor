<template>
  <div class="w-full">
    <img :src="modelValue.data.src" />
  </div>
</template>

<script setup lang="ts">
import { BlockImage } from "../../../interfaces/blocks";
import { watch, ref } from "vue";
const props = defineProps<{
  readOnly: Boolean;
  modelValue: BlockImage;
}>();

const src = ref(props.modelValue.data.src);
watch(props, () => {
  src.value = props.modelValue.data.src;
});
</script>