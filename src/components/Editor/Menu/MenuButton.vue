<template>
  <div
    class="bg-gray-200 hover:bg-gray-100 rounded cursor-pointer p-1 text-sm mt-2"
    @click="emit('click', true)"
  >
    <i class="fa-solid fa-check"></i>
    <span class="ml-2">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue';

defineProps<{
  label: string;
}>();
const emit = defineEmits(['click']);
</script>
