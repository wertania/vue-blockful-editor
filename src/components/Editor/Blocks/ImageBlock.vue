<template>
  <div class="w-full" :class="align">
    <img id="block-img" class="inline" :src="modelValue.data.src" />
  </div>
</template>

<script setup lang="ts">
import { BlockImage } from "../../../interfaces/blocks";
import { watch, ref, computed } from "vue";
const props = defineProps<{
  readOnly: Boolean;
  modelValue: BlockImage;
}>();

const src = ref(props.modelValue.data.src);
watch(props, () => {
  src.value = props.modelValue.data.src;
});

const width = computed(() => {
  const w = props.modelValue.data.width ?? "100%";
  return w;
});

const align = computed(() => {
  const a = props.modelValue.data.textAlign ?? "center";
  if (a === "center") return "text-center";
  else if (a === "right") return "text-right";
  else return "text-left";
});
</script>

<style scoped>
#block-img {
  width: v-bind(width);
  height: auto;
}
</style>