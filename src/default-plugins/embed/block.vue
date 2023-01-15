<template>
    <div class="w-full flex" :class="{
        'justify-start': align === 'left',
        'justify-center': align === 'center',
        'justify-end': align === 'right',
    }">
        <iframe id="iframe-container" :src="modelValue.data.src" />
    </div>
</template>

<script setup lang="ts">
import { watch, ref, computed } from "vue";
import { BlockEmbed } from "./types";
const props = defineProps<{
    readOnly: Boolean;
    modelValue: BlockEmbed;
}>();
const src = ref(props.modelValue.data.src);

watch(props, () => {
    src.value = props.modelValue.data.src;
});

// self style
const width = computed(() => {
    const w = props.modelValue.data.width ?? "100%";
    return w;
});

const height = computed(() => {
    const h = props.modelValue.data.height ?? "auto";
    return h;
});

const align = computed(() => {
    return props.modelValue.data.align ?? "left";
});
</script>

<style scoped>
#iframe-container {
    width: v-bind(width);
    height: v-bind(height);
    overflow: scroll;
}
</style>