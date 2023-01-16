<template>
    <div class="w-full" :class="align">
        <img v-if="modelValue.data.src != null && modelValue.data.src !== ''" id="block-img" class="inline"
            :src="modelValue.data.src" />
        <div v-else class="w-[50%] m-auto text-gray-400 text-center rounded-xl">
            <div class="m-auto">
                {{ "- no image selected -"}}
            </div>
            <div class="m-auto bg-gray-200 hover:bg-gray-300 rounded cursor-pointer p-1 mt-2"
                @click="uploadFromClipboard()">
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
                    @click="uploadFileFromInput()" :disabled="fileInput?.files?.length === 0" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { watch, ref, computed } from "vue";
import { BlockImage } from "./types";
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

/**
 * get actual timestamp as string in format yyyy_MM_dd__HH_mm_ss
 */
const getTimestampAsString = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    return `${year}_${month}_${day}__${hours}_${minutes}_${seconds}`;
}

const uploadFileFromInput = async () => {
    if (fileInput.value != null && fileInput.value?.files != null && props.uploadSettings.uploadFunction != null) {
        const file = fileInput.value.files[0];
        // give image to custom upload function
        // Object.defineProperty(file, 'name', {
        //     writable: true,
        //     value: `upload_${getTimestampAsString()}_${file.name}`
        // });
        console.log(file);
        inputUrl.value = await props.uploadSettings.uploadFunction(file);
        console.log(inputUrl.value);
        props.modelValue.data.src = inputUrl.value;
    } else {
        // if no custom url or function is provided throw error        
        console.error("No upload function provided or no valid data in file input");
    }
};

const uploadFromClipboard = async () => {
    if (props.uploadSettings?.uploadFunction != null) {
        // if a custom upload function is provided, use it
        // get file from clipboard
        const clipboardItems = await navigator.clipboard.read();
        if (clipboardItems[0] == null) {
            console.error("No item in clipboard");
            throw new Error("No item in clipboard");
        }
        const clipboardItem = clipboardItems[0];
        // check if file is image
        if (!clipboardItem.types.includes("image/png")) {
            console.error("Type of clipboard item is not image/png");
            throw new Error("Type of clipboard item is not image/png");
        }
        // upload file
        const blob = await clipboardItem.getType("image/png");
        const file = new File([blob], `upload_${getTimestampAsString()}.png`, {
            type: blob.type,
        });
        // give image to custom upload function
        inputUrl.value = await props.uploadSettings.uploadFunction(file);
        console.log(inputUrl.value);
        props.modelValue.data.src = inputUrl.value;
    } else {
        // if no custom url or function is provided throw error        
        console.error("No upload function provided");
    }
};

// directely set url
const inputUrl = ref("");
const saveWithUrl = async () => {
    if (inputUrl.value != null && inputUrl.value !== "") {
        props.modelValue.data.src = inputUrl.value;
    }
};

// styles of displayed image
const width = computed(() => {
    const w = props.modelValue.data.width ?? "auto";
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