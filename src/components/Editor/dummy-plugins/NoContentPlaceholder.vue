<template>
  <div
    class="flex flex-col items-center justify-center h-full"
    @click="emit('click', $event)"
  >
    <div class="text-gray-500 text-center">
      <div class="text-xl">{{ '- empty column -' }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['click']);
</script>
