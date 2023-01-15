<template>
    <div class="w-full flex" :class="
        {
            'justify-start': align === 'left',
            'justify-center': align === 'center',
            'justify-end': align === 'right',
        }
    ">
        {{ html }}
    </div>
</template>

<script setup lang="ts">
import { watch, ref, computed } from "vue";
import { BlockPlainHtml } from "./types";

const props = defineProps<{
    modelValue: BlockPlainHtml;
}>();

const html = ref(props.modelValue.data.html);
watch(props, () => {
    html.value = props.modelValue.data.html;
});

const emit = defineEmits(["update:modelValue"]);
watch(html, () => {
    emit("update:modelValue", {
        ...props.modelValue,
        data: {
            ...props.modelValue.data,
            html: html.value,
        },
    });
});

// self style
// const width = computed(() => {
//     const w = props.modelValue.data.width ?? "100%";
//     return w;
// });

// const height = computed(() => {
//     const h = props.modelValue.data.height ?? "auto";
//     return h;
// });

const align = "center";
// const align = computed(() => {
//     return props.modelValue.data.align ?? "left";
// });
</script>

<style scoped>
/* #iframe-container {
    width: v-bind(width);
    height: v-bind(height);
    overflow: scroll;
} */
</style>