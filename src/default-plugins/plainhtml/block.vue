<template>
  {{ props.modelValue }}
  <BlockEdit
    v-if="!props.readOnly && false"
    :modelValue="props.modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
  />
  <BlockView v-if="false" :modelValue="props.modelValue" />
</template>

<script setup lang="ts">
import BlockEdit from './block-edit.vue';
import BlockView from './block-view.vue';
import { BlockPlainHtml } from './types';

const emit = defineEmits(['update:modelValue']);

const props = defineProps<{
  readOnly: boolean;
  modelValue: BlockPlainHtml;
}>();
</script>
