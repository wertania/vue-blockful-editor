<template>
  <div id="page-editor">
    <div id="page-container">
      <div id="page" class="shadow-2xl">
        <BlockElement v-for="(block, i) of page.blocks" :key="i" :block="block" :index="i" @add="addBlock($event, i)"
          @update="updateBlock($event, i)" :readOnly="readOnly" :debug="debug" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { Block, BlockPage, BlockType } from "../interfaces/blocks";
import BlockElement from "./Editor/BlockElement.vue";
import { defineEmptyBlock } from "./../services/blocks";

const props = defineProps<{
  modelValue: BlockPage;
  readOnly: boolean;
  debug?: boolean;
}>();
const emit = defineEmits(['update:modelValue']);

const page = ref(props.modelValue);
watch(props, () => {
  page.value = props.modelValue;
}); // ??? nessesary?
watch(page, () => {
  emit('update:modelValue', page.value);
});

const addBlock = (data: { type: BlockType }, index: number) => {
  page.value.blocks.splice(index + 1, 0, defineEmptyBlock(data.type));
  console.log(page.value);
};

const updateBlock = (data: { block: Block }, index: number) => {
  page.value.blocks[index] = data.block;
};

// page style
const padding = computed(() => {
  const padding = page.value.style?.padding ?? { top: "30px", right: "30px", bottom: "30px", left: "30px", };
  return `${padding.left} ${padding.top} ${padding.right} ${padding.bottom}`;
});
const width = computed(() => page.value.style?.width ?? "90%");
const background = computed(() => page.value.style?.background ?? "#fffff9");
</script>

<style scoped>
#page-editor {
  width: 100%;
  height: 100vh;
  background: #fffff9;
}

#page-container {
  width: v-bind(width);
  margin: 0 auto;
}

#page {
  padding: v-bind(padding);
  background: v-bind(background);
  border-radius: 5px;
}
</style>