<template>
  <div id="page-editor">
    <div id="page-container">
      <div id="page" class="shadow-2xl">
        <BlockElement v-for="(block, i) of content.blocks" :block="block" :index="i" @add="addBlock($event, i)"
          @update="updateBlock($event, i)" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Block, BlockPage, BlockType } from "../interfaces/blocks";
import BlockElement from "./Editor/BlockElement.vue";
import { defineEmptyBlock } from "./../services/blocks";

const content = ref(<BlockPage>{
  creator: "",
  title: "",
  lastChange: "",
  lastChangeBy: "",
  blocks: [
    {
      type: "header",
      data: {
        text: "Hello World!",
        level: 1,
      },
      style: {
        spaceTop: 0,
        spaceBottom: 3,
      },
    },
    {
      type: "paragraph",
      data: {
        text: "Hello World!\r\n\r\nThis is a paragraph block. You can edit it by clicking on it.",
      },
      style: {
        spaceTop: 0,
        spaceBottom: 3,
      },
    },
    {
      type: "image",
      data: {
        src: "https://i.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
      },
      style: {
        spaceTop: 0,
        spaceBottom: 3,
      },
    },
    {
      type: "embed",
      data: {
        src: "https://www.wetter.de/widget/3tage/u1hcy/false/",
      },
      style: {
        spaceTop: 0,
        spaceBottom: 0,
      },
    },
  ],
});

const addBlock = (data: { type: BlockType }, index: number) => {
  content.value.blocks.splice(index + 1, 0, defineEmptyBlock(data.type));
};

const updateBlock = (data: { block: Block }, index: number) => {
  content.value.blocks[index] = data.block;
};
</script>

<style scoped>
#page-editor {
  width: 100%;
  height: 100vh;
  background: #fffff9;
}

#page-container {
  width: 90%;
  margin: 0 auto;
}

#page {
  padding: 30px;
  background-color: white;
  border-radius: 5px;
}
</style>