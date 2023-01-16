<template>

    <div class="w-full flex" :class="{    
        'justify-start': modelValue.data.src && align === 'left',
        'justify-center': modelValue.data.src && align === 'center',
        'justify-end': modelValue.data.src && align === 'right',
    }">
        <iframe v-if="modelValue.data.src != null && modelValue.data.src !== ''" id="iframe-container"
            :src="modelValue.data.src" />

        <div v-else class="w-[50%] m-auto text-gray-400 text-center rounded-xl">
            <div class="m-auto">
                {{ "- no URL -"}}
            </div>
            <div class="flex m-auto mt-2 mb-3">
                <div>{{ "Url"}}</div>
                <input type="text" class="ml-2 w-[300px] text-sm border" v-model="url" />
                <i class="fa-solid fa-check ml-2 text-2xl cursor-pointer hover:bg-gray-300 rounded"
                    @click="modelValue.data.src = url" :disabled="url == ''" />
            </div>
        </div>
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
const url = ref(props.modelValue.data.src);

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

// scroll mode
const overflowX = computed(() => {
    if (props.modelValue.data.scroll) {
        if (props.modelValue.data.scroll === 'xy') {
            return 'auto';
        }
        else if (props.modelValue.data.scroll === 'x') {
            return 'scroll';
        }
        else if (props.modelValue.data.scroll === 'y') {
            return 'hidden';
        }
        else if (props.modelValue.data.scroll === 'no') {
            return 'hidden';
        }
    } else {
        return 'auto';
    }
});
const overflowY = computed(() => {
    if (props.modelValue.data.scroll) {
        if (props.modelValue.data.scroll === 'xy') {
            return 'auto';
        }
        else if (props.modelValue.data.scroll === 'x') {
            return 'hidden';
        }
        else if (props.modelValue.data.scroll === 'y') {
            return 'scroll';
        }
        else if (props.modelValue.data.scroll === 'no') {
            return 'hidden';
        }
    } else {
        return 'auto';
    }
});
</script>

<style scoped>
#iframe-container {
    width: v-bind(width);
    height: v-bind(height);
    overflow-x: v-bind(overflowX);
    overflow-y: v-bind(overflowY);
}
</style>