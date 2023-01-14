<template>
  <span class="w-full textarea" role="textbox" autofocus :contenteditable="!readOnly" @input="updateText($event)">
    {{ text }}
  </span>
</template>

<script setup lang="ts">
import { BlockParagraph } from "./../../../interfaces/blocks";
import { ref, watch } from "vue";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps<{
  readOnly: Boolean;
  modelValue: BlockParagraph;
}>();

const text = ref(props.modelValue.data.text);

const updateText = (e: Event) => {
  const txt = (e.target as HTMLDivElement).innerText;
  emit("update:modelValue", {
    ...props.modelValue,
    data: {
      ...props.modelValue.data,
      text: txt,
    }
  });
};

watch(props.modelValue, () => {
  text.value = props.modelValue.data.text;
});
</script>

<style>
/* HACK replace with tailwind */
.textarea {
  display: block;
  overflow: hidden;
  resize: both;
  min-height: 40px;
  line-height: 20px;
}
</style>