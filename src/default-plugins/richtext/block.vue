<template>
    <div v-if="editor && !readOnly" id="editor-toolbar">

        <div class="flex">
            <!-- hide/show -->
            <i class="fa-solid bg-gray-200 hover:bg-gray-200 rounded-sm cursor-pointer p-1 ml-0"
                @click="toolbarToggled = !toolbarToggled" :disabled="!editor.can().chain().focus().toggleBold().run()"
                :class="{ 'bg-gray-400': editor.isActive('bold'), 'fa-eye-slash': toolbarToggled, 'fa-eye': !toolbarToggled }" />

            <div v-if="!toolbarToggled">
                <i class="fa-solid fa-bold bg-gray-200 hover:bg-gray-100 rounded-sm cursor-pointer p-1 ml-1"
                    @click="editor?.chain().focus().toggleBold().run()"
                    :disabled="!editor.can().chain().focus().toggleBold().run()"
                    :class="{ 'bg-gray-400': editor.isActive('bold') }" />

                <i class="fa-solid fa-italic  bg-gray-200 hover:bg-gray-100 rounded-sm cursor-pointer p-1 ml-1"
                    @click="editor?.chain().focus().toggleItalic().run()"
                    :disabled="!editor.can().chain().focus().toggleItalic().run()"
                    :class="{ 'bg-gray-400': editor.isActive('italic') }" />

                <i class="fa-solid fa-strikethrough bg-gray-200 hover:bg-gray-100 rounded-sm cursor-pointer p-1 ml-1"
                    @click="editor?.chain().focus().toggleStrike().run()"
                    :disabled="!editor.can().chain().focus().toggleStrike().run()"
                    :class="{ 'bg-gray-400': editor.isActive('strike') }" />

                <i class="fa-solid fa-code bg-gray-200 hover:bg-gray-100 rounded-sm cursor-pointer p-1 ml-1"
                    @click="editor?.chain().focus().toggleCode().run(); editor?.chain().focus().unsetAllMarks().run()"
                    :disabled="!editor.can().chain().focus().toggleCode().run()"
                    :class="{ 'bg-gray-400': editor.isActive('code') }" />

                <!-- <i class="fa-solid fa-bold" @click="editor?.chain().focus().unsetAllMarks().run()">
      clear marks
    </i> -->

                <i class="fa-solid fa-text-slash bg-gray-200 hover:bg-gray-100 rounded-sm cursor-pointer p-1 ml-1"
                    @click="editor?.chain().focus().clearNodes().run()" />

                <i class="fa-solid fa-paragraph bg-gray-200 hover:bg-gray-100 rounded-sm cursor-pointer p-1 ml-1"
                    @click="editor?.chain().focus().setParagraph().run()"
                    :class="{ 'bg-gray-400': editor.isActive('paragraph') }" />

                <i class="not-italic bg-gray-200 hover:bg-gray-100 rounded-sm cursor-pointer p-1 ml-1"
                    @click="editor?.chain().focus().toggleHeading({ level: 1 }).run()"
                    :class="{ 'bg-gray-400': editor.isActive('heading', { level: 1 }) }">
                    h1
                </i>
                <i class="not-italic bg-gray-200 hover:bg-gray-100 rounded-sm cursor-pointer p-1 ml-1"
                    @click="editor?.chain().focus().toggleHeading({ level: 2 }).run()"
                    :class="{ 'bg-gray-400': editor.isActive('heading', { level: 2 }) }">
                    h2
                </i>
                <i class="not-italic bg-gray-200 hover:bg-gray-100 rounded-sm cursor-pointer p-1 ml-1"
                    @click="editor?.chain().focus().toggleHeading({ level: 3 }).run()"
                    :class="{ 'bg-gray-400': editor.isActive('heading', { level: 3 }) }">
                    h3
                </i>
                <i class="not-italic bg-gray-200 hover:bg-gray-100 rounded-sm cursor-pointer p-1 ml-1"
                    @click="editor?.chain().focus().toggleHeading({ level: 4 }).run()"
                    :class="{ 'bg-gray-400': editor.isActive('heading', { level: 4 }) }">
                    h4
                </i>
                <i class="not-italic bg-gray-200 hover:bg-gray-100 rounded-sm cursor-pointer p-1 ml-1"
                    @click="editor?.chain().focus().toggleHeading({ level: 5 }).run()"
                    :class="{ 'bg-gray-400': editor.isActive('heading', { level: 5 }) }">
                    h5
                </i>
                <i class="not-italic bg-gray-200 hover:bg-gray-100 rounded-sm cursor-pointer p-1 ml-1"
                    @click="editor?.chain().focus().toggleHeading({ level: 6 }).run()"
                    :class="{ 'bg-gray-400': editor.isActive('heading', { level: 6 }) }">
                    h6
                </i>

                <i class="fa-solid fa-list-ul bg-gray-200 hover:bg-gray-100 rounded-sm cursor-pointer p-1 ml-1"
                    @click="editor?.chain().focus().toggleBulletList().run()"
                    :class="{ 'bg-gray-400': editor.isActive('bulletList') }" />

                <i class="fa-solid fa-list-ol bg-gray-200 hover:bg-gray-100 rounded-sm cursor-pointer p-1 ml-1"
                    @click="editor?.chain().focus().toggleOrderedList().run()"
                    :class="{ 'bg-gray-400': editor.isActive('orderedList') }" />

                <i class="fa-solid fa-file-code bg-gray-200 hover:bg-gray-100 rounded-sm cursor-pointer p-1 ml-1"
                    @click="editor?.chain().focus().toggleCodeBlock().run()"
                    :class="{ 'bg-gray-400': editor.isActive('codeBlock') }" />

                <i class="fa-solid fa-chevron-right bg-gray-200 hover:bg-gray-100 rounded-sm cursor-pointer p-1 ml-1"
                    @click="editor?.chain().focus().toggleBlockquote().run()"
                    :class="{ 'bg-gray-400': editor.isActive('blockquote') }" />

                <i class="fa-solid fa-minus bg-gray-200 hover:bg-gray-100 rounded-sm cursor-pointer p-1 ml-1"
                    @click="editor?.chain().focus().setHorizontalRule().run()" />

                <i class="fa-solid fa-rotate-left bg-gray-200 hover:bg-gray-100 rounded-sm cursor-pointer p-1 ml-1"
                    @click="editor?.chain().focus().undo().run()"
                    :disabled="!editor.can().chain().focus().undo().run()" />

                <i class="fa-solid fa-rotate-right bg-gray-200 hover:bg-gray-100 rounded-sm cursor-pointer p-1 ml-1"
                    @click="editor?.chain().focus().redo().run()"
                    :disabled="!editor.can().chain().focus().redo().run()" />
            </div>
        </div>
    </div>
    <editor-content :editor="editor" />
</template>

<script setup lang="ts">
import { watch, onBeforeMount, ref } from "vue";
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import { BlockRichText } from "./types";

const emit = defineEmits(["update:modelValue"]);
const props = defineProps<{
    readOnly: Boolean;
    modelValue: BlockRichText;
}>();

const toolbarToggled = ref(false);

// initialize the TipTap instance
const editor = useEditor({
    content: props.modelValue.data.html,
    extensions: [
        StarterKit,
    ],
    editable: !props.readOnly,
    onUpdate: () => {
        emit('update:modelValue', {
            ...props.modelValue,
            data: {
                html: editor.value?.getHTML(),
            },
        })
    },
});

// check for updates from parent
watch(() => props.modelValue, (value) => {
    const isSame = editor.value?.getHTML() === value.data.html;
    if (isSame) {
        return;
    } else {
        editor.value?.commands.setContent(value.data.html, false);
    }
});

onBeforeMount(() => {
    editor.value?.destroy();
})

watch(() => props.readOnly, (value) => {
    editor.value?.setEditable(!value);
});
</script>

<style lang="postcss">
/* Basic editor styles */
.test {
    @nest p {
        margin: 0;
    }
}

.ProseMirror {

    & ul,
    ol {
        padding: 0 1rem;
    }

    & ol {
        list-style-type: decimal;
    }

    & ul {
        list-style-type: disc;
    }

    & h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        line-height: 1.1;
    }

    & code {
        background-color: rgba(#616161, 0.1);
        color: #616161;
    }

    & pre {
        background: #0D0D0D;
        color: #FFF;
        font-family: 'JetBrainsMono', monospace;
        padding: 0.75rem 1rem;
        border-radius: 0.5rem;

        & code {
            color: inherit;
            padding: 0;
            background: none;
            font-size: 0.8rem;
        }
    }

    & img {
        max-width: 100%;
        height: auto;
    }

    & blockquote {
        padding-left: 1rem;
        border-left: 2px solid #a3a3a3;
    }

    & hr {
        border: none;
        border-top: 2px solid #a3a3a3;
        margin: 2rem 20px;
    }
}
</style>