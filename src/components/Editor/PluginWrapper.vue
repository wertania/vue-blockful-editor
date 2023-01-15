<template>
    <!-- Wrap component dynamic from Plugin -->
    <props.plugin.block v-if="props.plugin.name === modelValue.type" :modelValue="modelValue" :readOnly="readOnly"
        :debug="debug" @update="" :uploadSettings="uploadSettings" />
</template> 

<script setup lang="ts">
import { UniversalBlock } from "../../interfaces/page";
import { UploadSettings } from "../../interfaces/upload";

const props = defineProps<{
    readOnly: boolean;
    plugin: any; // HACK: any[] is not correct
    debug?: boolean;
    modelValue: UniversalBlock;
    uploadSettings?: UploadSettings;
}>();
</script>