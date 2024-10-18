<template>
  <div
    ref="editMenu"
    v-click-outside="closeMenu"
    class="fixed left-10 shadow-md bg-white w-[250px] rounded-md p-2 z-50 custom-top"
  >
    <h6 class="mb-2 font-semibold text-gray-900 dark:text-white">
      {{ 'Edit' }}
    </h6>

    <!-- custom entries -->
    <div v-for="entry in customEntriesEditMenu" :key="entry.name">
      <component
        v-if="entry.name === modelValue.type"
        :is="entry.template"
        v-model="block"
        @close="emit('close', true)"
      />
    </div>

    <!-- delete button -->
    <div
      class="bg-gray-200 hover:bg-gray-100 rounded cursor-pointer p-1 text-sm mt-2"
      @click="emit('drop', true)"
    >
      <i class="fa-solid fa-trash"></i>
      <span class="ml-2">{{ 'Delete' }}</span>
    </div>

    <!-- close button -->
    <MenuButton label="Close" @click="emit('close', true)" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { EditMenuEntry } from '../../../interfaces/menu';
import { UniversalBlock } from '../../../interfaces/page';
import MenuButton from './MenuButton.vue';

const emit = defineEmits(['close', 'drop']);

const props = defineProps<{
  top: number;
  left: number;
  modelValue: UniversalBlock;
  customEntriesEditMenu: EditMenuEntry[]; // custom entries to render
}>();

const block = ref(props.modelValue);

// self style
const editMenu = ref(null);

const topPx = computed(() => {
  if (editMenu.value != null) {
    const menu: HTMLElement = editMenu.value;
    if (props.top + menu.offsetHeight > window.innerHeight) {
      return `${window.innerHeight - menu.offsetHeight}px`;
    } else {
      return `${props.top}px`;
    }
  }
});

const leftPx = computed(() => `${props.left}px`);

const closeMenu = () => {
  emit('close');
};
</script>

<style scoped>
.custom-top {
  top: v-bind(topPx);
  left: v-bind(leftPx);
}
</style>
