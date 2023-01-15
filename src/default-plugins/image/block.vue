<template>
    <div class="w-full" :class="align">
        <img v-if="modelValue.data.src != null && modelValue.data.src !== ''" id="block-img" class="inline"
            :src="modelValue.data.src" />
        <div v-else class="w-[50%] m-auto text-gray-400 text-center rounded-xl">
            <div class="m-auto">
                {{ "- no image selected -"}}
            </div>
            <div class="m-auto bg-gray-200 hover:bg-gray-300 rounded cursor-pointer p-1 mt-2"
                @click="uploadClipboard()">
                {{ "Paste from Clipboard"}}
            </div>
            <div class="flex m-auto mt-2">
                <div>{{ "Url"}}</div>
                <input type="text" class="ml-2 border border-gray-600 w-[300px]" v-model="inputUrl" />
                <i class="fa-solid fa-check ml-2 text-2xl cursor-pointer hover:bg-gray-300 rounded"
                    @click="saveWithUrl()" />
            </div>
            <div class="flex m-auto mt-2 mb-3">
                <div>{{ "File"}}</div>
                <input type="file" class="ml-2 w-[300px] text-sm" ref="fileInput" />
                <i class="fa-solid fa-check ml-2 text-2xl cursor-pointer hover:bg-gray-300 rounded"
                    @click="uploadFileFromInput()" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { watch, ref, computed } from "vue";
import { BlockImage } from "./types";
import { uploadFromClipboard } from "./../../services/upload";
import { UploadSettings } from "../../interfaces/upload";

const props = defineProps<{
    readOnly: Boolean;
    modelValue: BlockImage;
    uploadSettings: UploadSettings;
}>();

const src = ref(props.modelValue.data.src);
watch(props, () => {
    src.value = props.modelValue.data.src;
});

// methods to handle file upload
const fileInput = ref<HTMLInputElement | null>(null);
const uploadFileFromInput = async () => {
    if (fileInput.value != null && fileInput.value?.files != null) {
        const formData = new FormData();
        formData.append("value", fileInput.value.files[0]);
        await fetch("http://localhost:3000/upload", {
            method: "POST",
            body: formData,
        });
    }
};
const uploadClipboard = async () => {
    if (props.uploadSettings == null) {
        console.log("No upload settings provided");
        return;
    }
    uploadFromClipboard(props.uploadSettings.url)
};

const inputUrl = ref("");
const saveWithUrl = async () => {
    if (inputUrl.value != null && inputUrl.value !== "") {
        props.modelValue.data.src = inputUrl.value;
    }
};

// styles
const width = computed(() => {
    const w = props.modelValue.data.width ?? "100%";
    return w;
});

const align = computed(() => {
    const a = props.modelValue.data.textAlign ?? "center";
    if (a === "center") return "text-center";
    else if (a === "right") return "text-right";
    else return "text-left";
});
</script>

<style scoped>
#block-img {
    width: v-bind(width);
    height: auto;
}
</style>