<template>
  <!-- DEMO APPLICATION WITH EDITOR AND THE PARAMETERS TO TEST -->

  <div class="flex">
    <!-- side menu -->
    <div class="w-2/12 text-sm bg-gray-300 p-3">

      <span>Demo Sidebar</span><br />

      <span>Parameters:</span>

      <div class="flex items-center mt-2">
        <input id="debug" type="checkbox" v-model="debug"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded">
        <label for="debug" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Debug Mode
        </label>
      </div>

      <div class="flex items-center mt-2">
        <input id="readOnly" type="checkbox" v-model="readOnly"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded">
        <label for="readOnly" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Read only
        </label>
      </div>

      <div class="flex items-center mt-2">
        <input id="showAllBlockControls" type="checkbox" v-model="showAllBlockControls"
          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded">
        <label for="showAllBlockControls" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          Show controls
        </label>
      </div>

      <div class="bg-gray-400 rounded p-2 mt-2 cursor-pointer">Test Element to drag</div>
    </div>

    <!-- editor component -->
    <div class="w-10/12">
      <BlockEditor v-model="demoContent" :readOnly="readOnly" :debug="debug" :plugins="plugins"
        :showAllBlockControls="showAllBlockControls" />
    </div>
  </div>


</template>

<script setup lang="ts">
import { ref } from "vue";

// editor
import BlockEditor from "./components/Editor/BlockEditor.vue";
import { BlockPage } from "./interfaces/page";
// plugins
import PluginPlainHtml from "./default-plugins/plainhtml";
import PluginDelimiter from "./default-plugins/delimiter";
import PluginEmbed from "./default-plugins/embed";
import PluginHeader from "./default-plugins/header";
import PluginImage from "./default-plugins/image";
import PluginParagraph from "./default-plugins/paragraph";
import PluginRichText from "./default-plugins/richtext";

const plugins = [
  PluginPlainHtml,
  PluginDelimiter,
  PluginEmbed,
  PluginHeader,
  PluginImage,
  PluginParagraph,
  PluginRichText,
];

const readOnly = ref(false);
const showAllBlockControls = ref(false);
const debug = ref(false);

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
        spaceTop: 1,
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
