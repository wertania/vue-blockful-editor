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

      <div class="bg-gray-400 rounded p-2 mt-2 cursor-pointer" draggable="true" @dragstart="onDrag($event)">Test Element
        to
        drag
      </div>

      <div class="mt-3">
        <input type="file" class="w-[300px] text-sm" ref="fileInput" />
        <button class="w-[100px] text-sm text-center bg-gray-400 rounded p-1 mt-1" @click="loadPage()">Open</button>
        <button class="w-[100px] text-sm text-center bg-gray-400 rounded p-1 mt-1" @click="savePage()">Save</button>
      </div>
    </div>

    <!-- editor component -->
    <div class="w-10/12">
      <BlockEditor v-model="page" :readOnly="readOnly" :debug="debug" :plugins="plugins"
        :showAllBlockControls="showAllBlockControls" :uploadSettings="uploadSettings" />
    </div>
  </div>


</template>

<script setup lang="ts">
import { ref } from "vue";

// editor
import BlockEditor from "./components/Editor/BlockEditor.vue";
import { BlockPage } from "./interfaces/page";
import { UploadSettings } from "./interfaces/upload";
// editor plugins
import PluginPlainHtml from "./default-plugins/plainhtml";
import PluginDelimiter from "./default-plugins/delimiter";
import PluginEmbed from "./default-plugins/embed";
import PluginHeader from "./default-plugins/header";
import PluginImage from "./default-plugins/image";
import PluginParagraph from "./default-plugins/paragraph";
import PluginRichText from "./default-plugins/richtext";

import { BlockImage } from "./default-plugins/image/types";
import { DragNDropData } from "./interfaces/dragndrop";

const plugins = [
  // PluginPlainHtml,
  PluginDelimiter,
  PluginEmbed,
  PluginHeader,
  PluginImage,
  PluginParagraph,
  PluginRichText,
];

// custom function for image upload against dev-server
const uploadFileToDevServer = async (file: File): Promise<string> => {
  // get file from clipboard
  const formData = new FormData();
  formData.append("file", file);
  const r = await fetch("http://localhost:3000/upload", {
    method: "POST",
    body: formData,
  });
  const response = await r.json();
  // dev server returns an object with the url of the uploaded file
  return response.url;
};

// editor parameters
const readOnly = ref(false);
const showAllBlockControls = ref(false);
const debug = ref(false);
const uploadSettings = ref(<UploadSettings>{
  uploadFunction: uploadFileToDevServer,
});

const fileInput = ref<HTMLInputElement | null>(null);
const loadPage = async () => {
  if (fileInput.value) {
    const file = fileInput.value.files?.[0];
    // console.log(file);
    if (file) {
      const r = await fetch(URL.createObjectURL(file));
      const p = await r.json();
      // console.log(p);
      page.value = p;
    }
  }
};

const savePage = async () => {
  const p = page.value;
  const blob = new Blob([JSON.stringify(p)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "page.json";
  link.click();
}

// send some data to the editor with drag and drop
const onDrag = (event: DragEvent) => {
  const data: BlockImage = {
    type: "image",
    data: {
      src: "https://i.picsum.photos/id/13/2500/1667.jpg?hmac=SoX9UoHhN8HyklRA4A3vcCWJMVtiBXUg0W4ljWTor7s",
    },
    style: {
      spaceTop: 0,
      spaceBottom: 0,
    },
  };
  const dde: DragNDropData = {
    type: "block",
    action: "add",
    data,
  }
  event.dataTransfer?.setData("data", JSON.stringify(dde));
};

// show some data in the editor
const demoContent = ref(<BlockPage>{
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
      type: "columns",
      data: {
        columns: [
          {
            type: "column",
            data: {
              blocks: [
                {
                  type: "header",
                  data: {
                    text: "Col 1",
                    level: 3,
                  },
                  style: {
                    spaceTop: 0,
                    spaceBottom: 0,
                  },
                },
              ]
            }
          },
          {
            type: "column",
            data: {
              blocks: [
                {
                  type: "header",
                  data: {
                    text: "Col 2",
                    level: 3,
                  },
                  style: {
                    spaceTop: 0,
                    spaceBottom: 0,
                  },
                },
              ]
            }
          },
        ]
      },
      style: {
        spaceTop: 1,
        spaceBottom: 1,
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
  ],
});

const page = ref(demoContent);

</script>
