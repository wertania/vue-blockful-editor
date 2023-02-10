<template>
    <ul class="max-w-md space-y-1 text-gray-500 list-inside">
        <!-- iframe align -->
        <li class="flex items-center">
            <span class="ml-2 text-sm">{{ "Align" }}</span>
            <i class="fa-solid fa-align-left text-2xl cursor-pointer hover:bg-gray-100 ml-3"
                @click="modelValue.data.align = 'left'" />
            <i class="fa-solid fa-align-center text-2xl cursor-pointer hover:bg-gray-100 ml-1"
                @click="modelValue.data.align = 'center'" />
            <i class="fa-solid fa-align-right text-2xl cursor-pointer hover:bg-gray-100 ml-1"
                @click="modelValue.data.align = 'right'" />
        </li>
        <!-- width and height -->
        <!-- width -->
        <li class="flex items-center">
            <span class="ml-2 text-sm">{{ "Width" }}</span>
            <i class="text-sm cursor-pointer rounded-xl bg-gray-200 p-[3px] hover:bg-gray-100 ml-3"
                @click="widthMode = '%'; updateWidth(width)">%</i>
            <i class="text-sm cursor-pointer rounded-xl bg-gray-200 p-[3px] hover:bg-gray-100 ml-3"
                @click="widthMode = 'px'; updateWidth(width)">px</i>
            <input type="number" class="w-[60px] ml-3 text-sm" @input="updateWidth(null, $event)"
                v-model.number="width" />
            {{ widthMode }}
        </li>
        <!-- height -->
        <li class="flex items-center">
            <span class="ml-2 text-sm">{{ "Height" }}</span>
            <i class="text-sm cursor-pointer rounded-xl bg-gray-200 p-[3px] hover:bg-gray-100 ml-3"
                @click="heightMode = 'vh'; updateHeight(height)">vh</i>
            <i class="text-sm cursor-pointer rounded-xl bg-gray-200 p-[3px] hover:bg-gray-100 ml-3"
                @click="heightMode = 'px'; updateHeight(height)">px</i>
            <input type="number" class="w-[60px] ml-3 text-sm" @input="updateHeight(null, $event)"
                v-model.number="height" />
            {{ heightMode }}
        </li>

        <!-- scroll -->
        <li class="flex items-center">
            <span class="ml-2 text-sm">{{ "Scroll" }}</span>
            <i class="text-sm cursor-pointer rounded-xl bg-gray-200 p-[3px] hover:bg-gray-100 ml-3"
                @click="modelValue.data.scroll = 'xy'">xy</i>
            <i class="text-sm cursor-pointer rounded-xl bg-gray-200 p-[3px] hover:bg-gray-100 ml-3"
                @click="modelValue.data.scroll = 'x'">x</i>
            <i class="text-sm cursor-pointer rounded-xl bg-gray-200 p-[3px] hover:bg-gray-100 ml-3"
                @click="modelValue.data.scroll = 'y'">y</i>
            <i class="text-sm cursor-pointer rounded-xl bg-gray-200 p-[3px] hover:bg-gray-100 ml-3"
                @click="modelValue.data.scroll = 'no'">no</i>
        </li>

        <MenuButton @click="modelValue.data.src = ''" label="Remove Url" />
    </ul>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { BlockEmbed } from "./types";
import MenuButton from "../../components/Editor/Menu/MenuButton.vue";

const props = defineProps<{
    modelValue: BlockEmbed;
}>();

const width = ref<number | null>(100);
const widthMode = ref(<'%' | 'px'>"%");

const updateWidth = (val: null | number, e?: Event) => {
    if (val) {
        props.modelValue.data.width = val + widthMode.value;
    }
    else if (e) {
        const target = e.target as HTMLInputElement;
        props.modelValue.data.width = target.value + widthMode.value;
    }
};

const height = ref<number | null>(100);
const heightMode = ref(<'vh' | 'px'>"px");

const updateHeight = (val: null | number, e?: Event) => {
    if (val) {
        props.modelValue.data.height = val + heightMode.value;
    }
    else if (e) {
        const target = e.target as HTMLInputElement;
        props.modelValue.data.height = target.value + heightMode.value;
    }
};
</script>