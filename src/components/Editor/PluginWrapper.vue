<template>
  <!-- Wrap component dynamic from Plugin -->
  <props.plugin.block
    v-if="props.plugin.name === modelValue.type"
    :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    :readOnly="readOnly"
    :debug="debug"
    :uploadSettings="uploadSettings"
  />
</template>

<script setup lang="ts">
import { UniversalBlock } from '../../interfaces/page';
import { BlockPlugin } from '../../interfaces/plugin';
import { UploadSettings } from '../../interfaces/upload';

const props = defineProps<{
  readOnly: boolean;
  modelValue: UniversalBlock;
  plugin: BlockPlugin;
  debug?: boolean;
  uploadSettings?: UploadSettings;
}>();
</script>
