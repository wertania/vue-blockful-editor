<template>
  <div class="fixed left-10 shadow-md bg-white w-[150px] rounded-md p-2 custom-top">
    <h6 class="mb-2 font-semibold text-gray-900 dark:text-white">
      {{ "Edit" }}
    </h6>
    <MenuParamsEmbedBlock v-if="modelValue.type === 'embed'" v-model="block" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Block } from "./../../../interfaces/blocks";
import MenuParamsEmbedBlock from "./Edit/MenuParamsEmbedBlock.vue";

defineEmits(["close"]);

const props = defineProps<{
  top: number;
  left: number;
  modelValue: Block;
}>();

const block = ref(props.modelValue);

// self style
const topPx = computed(() => `${props.top}px`);
const leftPx = computed(() => `${props.left}px`);
</script>

<style scoped>
.custom-top {
  top: v-bind(topPx);
  left: v-bind(leftPx);
}
</style>