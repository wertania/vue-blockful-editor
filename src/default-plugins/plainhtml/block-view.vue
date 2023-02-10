<template>
    <div>
        {{ modelValue.data.html }}
    </div>
</template>

<script setup lang="ts">
import { BlockPlainHtml } from './types';

const props = defineProps<{
    modelValue: BlockPlainHtml;
}>();
</script>