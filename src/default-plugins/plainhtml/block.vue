<template>
    <div>
      <textarea
        v-if="!readOnly"
        v-model="htmlContent.data.html"
        @input="autoResize"
        @keydown="handleTab"
        placeholder="Enter your HTML content here. Like <p>This is a paragraph.</p> or <h1>This is a heading.</h1>"
      ></textarea>
      <div v-else v-html="htmlContent.data.html"></div>
    </div>
  </template>

  <script setup lang="ts">
  import { ref, watch } from 'vue';
import { BlockPlainHtml } from './types';

  const emit = defineEmits(['update:modelValue']);
  const props = defineProps<{ readOnly: boolean; modelValue: BlockPlainHtml }>();

  const htmlContent = ref(props.modelValue);

  watch(() => props.modelValue, (newValue) => {
    htmlContent.value = newValue;
  });

  const autoResize = (event: Event) => {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleTab = (event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      const textarea = event.target as HTMLTextAreaElement;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      textarea.value = `${textarea.value.substring(0, start)}\t${textarea.value.substring(end)}`;
      textarea.selectionStart = textarea.selectionEnd = start + 1;

      emit('update:modelValue', htmlContent.value);
    }
  };
  </script>

  <style scoped>
  textarea {
    width: 100%;
    padding: 10px;
    font-family: monospace;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    resize: none;
    overflow: hidden;
  }
  </style>