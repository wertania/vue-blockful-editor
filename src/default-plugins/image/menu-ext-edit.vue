<template>
  <ul class="max-w-md space-y-1 text-gray-500 list-inside">
    <!-- text align -->
    <li class="flex items-center">
      <span class="ml-2 text-sm">{{ 'Align' }}</span>
      <i
        class="fa-solid fa-align-left text-2xl cursor-pointer hover:bg-gray-100 ml-3"
        @click="modelValue.data.textAlign = 'left'"
      />
      <i
        class="fa-solid fa-align-center text-2xl cursor-pointer hover:bg-gray-100 ml-1"
        @click="modelValue.data.textAlign = 'center'"
      />
      <i
        class="fa-solid fa-align-right text-2xl cursor-pointer hover:bg-gray-100 ml-1"
        @click="modelValue.data.textAlign = 'right'"
      />
    </li>
    <!-- width -->
    <li class="flex items-center">
      <span class="ml-2 text-sm">{{ 'Width' }}</span>
      <i
        class="text-sm cursor-pointer rounded-xl bg-gray-200 p-[3px] hover:bg-gray-100 ml-3"
        @click="
          widthMode = '%';
          updateWidth(width);
        "
        >%</i
      >
      <i
        class="text-sm cursor-pointer rounded-xl bg-gray-200 p-[3px] hover:bg-gray-100 ml-3"
        @click="
          widthMode = 'px';
          updateWidth(width);
        "
        >px</i
      >
      <input
        type="number"
        class="w-[60px] ml-3 text-sm"
        @input="updateWidth(null, $event)"
        v-model.number="width"
      />
      {{ widthMode }}
    </li>
    <!-- clear -->
    <MenuButton label="Clear Image" @click="modelValue.data.src = ''" />
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { BlockImage } from './types';
import MenuButton from './../../components/Editor/Menu/MenuButton.vue';

const props = defineProps<{
  modelValue: BlockImage;
}>();

const width = ref<number | null>(100);
const widthMode = ref(<'%' | 'px'>'%');

const updateWidth = (val: null | number, e?: Event) => {
  if (val) {
    props.modelValue.data.width = val + widthMode.value;
  } else if (e) {
    const target = e.target as HTMLInputElement;
    props.modelValue.data.width = target.value + widthMode.value;
  }
};
</script>
