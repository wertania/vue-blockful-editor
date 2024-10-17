<template>
  <h1 v-if="modelValue.data.level === 1">
    <div
      class="w-full"
      :class="textAlign"
      role="textbox"
      ref="spanElement"
      :contenteditable="!readOnly"
      @input="updateText($event)"
    >
      {{ text }}
    </div>
  </h1>
  <h2 v-else-if="modelValue.data.level === 2">
    <div
      class="w-full"
      :class="textAlign"
      role="textbox"
      ref="spanElement"
      :contenteditable="!readOnly"
      @input="updateText($event)"
    >
      {{ text }}
    </div>
  </h2>
  <h3 v-else-if="modelValue.data.level === 3">
    <div
      class="w-full"
      :class="textAlign"
      role="textbox"
      ref="spanElement"
      :contenteditable="!readOnly"
      @input="updateText($event)"
    >
      {{ text }}
    </div>
  </h3>
  <h4 v-else-if="modelValue.data.level === 4">
    <div
      class="w-full"
      :class="textAlign"
      role="textbox"
      ref="spanElement"
      :contenteditable="!readOnly"
      @input="updateText($event)"
    >
      {{ text }}
    </div>
  </h4>
  <h5 v-else-if="modelValue.data.level === 5">
    <div
      class="w-full"
      :class="textAlign"
      role="textbox"
      ref="spanElement"
      :contenteditable="!readOnly"
      @input="updateText($event)"
    >
      {{ text }}
    </div>
  </h5>
  <h6 v-else>
    <div
      class="w-full"
      :class="textAlign"
      role="textbox"
      ref="spanElement"
      :contenteditable="!readOnly"
      @input="updateText($event)"
    >
      {{ text }}
    </div>
  </h6>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';
import { BlockHeader } from './types';

const emit = defineEmits(['update:modelValue']);

const props = defineProps<{
  readOnly: boolean;
  modelValue: BlockHeader;
}>();

const spanElement = ref<HTMLSpanElement | null>(null);

const text = ref(props.modelValue.data.text);
watch(props, () => {
  text.value = props.modelValue.data.text;
});

const textAlign = computed(() => {
  const textAlign = props.modelValue.data.textAlign ?? 'left';
  if (textAlign === 'center') return 'text-center';
  else if (textAlign === 'right') return 'text-right';
  else return 'text-left';
});

const updateText = (e: Event) => {
  const txt = (e.target as HTMLDivElement).innerText;
  // if (txt === "") txt = "-"; // HACK: prevent empty text since the element will be uneditable with empty text
  text.value = txt;
  props.modelValue.data.text = txt;
  // emit("update:modelValue", {
  //     ...props.modelValue,
  //     data: {
  //         ...props.modelValue.data,
  //         text: txt,
  //     },
  // });
};

watch(props.modelValue, () => {
  text.value = props.modelValue.data.text;
});

// ensure the element is focused after being rendered
onMounted(() => {
  spanElement.value?.focus();
})
</script>
