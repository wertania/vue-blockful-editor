<template>
  <!-- APPEND TO MENU "ADD"-->
  <div>
    <li
      class="flex items-center hover:bg-gray-100 cursor-pointer"
      @click="$emit('add', type)"
    >
      <i class="fa-solid fa-code text-2xl" />
      <span class="ml-2 text-sm">{{ 'Plain HTML' }}</span>
    </li>
  </div>
</template>

<script setup lang="ts">
// type to add
const emit = defineEmits(['add']);
const type = 'plainhtml';
</script>
