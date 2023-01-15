<template>
  <BlockEditor v-model="demoContent" :readOnly="false" :debug="false" />
</template>

<script setup lang="ts">
import BlockEditor from "./components/BlockEditor.vue";
import { BlockPage } from "./interfaces/blocks";
import { ref } from "vue";

const demoContent = ref(<BlockPage>{
  creator: "Björn Enders",
  title: "A demo page",
  style: {
    padding: {
      top: "30px",
      right: "30px",
      bottom: "30px",
      left: "30px",
    },
    width: "90%",
    background: "#ffffff",
  },
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
      type: "richtext",
      data: {
        html: "<p>Hi there. I´m vue-blockful-editor!</p>",
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
      type: "paragraph",
      data: {
        text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna",
        textAlign: "center",
      },
      style: {
        spaceTop: 0,
        spaceBottom: 3,
      },
    },
    {
      type: "delimiter",
      data: {},
      style: {
        spaceTop: 0,
        spaceBottom: 0,
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
    {
      type: "delimiter",
      data: {},
      style: {
        spaceTop: 0,
        spaceBottom: 0,
      },
    },
  ],
});
</script>
