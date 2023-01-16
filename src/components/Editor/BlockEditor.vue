<template>
  <div id="page-editor" @scroll="emitter.emit('hide-controls')">
    <div id="page-container">
      <div id="page" class="shadow-2xl">
        <BlockElement v-for="(block, i) of page.blocks" :key="i" :block="block" :index="i" @add="addBlock($event)"
          @drop="dropBlock(i)" @update="updateBlock($event, i)" :readOnly="readOnly" :debug="debug"
          :plugins="allPlugins" :blocksToAdd="blocksToAdd" :customEntriesEditMenu="customEntriesEditMenu"
          :showAllBlockControls="showAllBlockControls" @move="movePosition($event, i)"
          :uploadSettings="uploadSettings" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, Component } from "vue";
import { AddMenuEntry, EditMenuEntry } from "../../interfaces/menu";
import { BlockColumns } from "../../interfaces/columns";
import { BlockPage, UniversalBlock } from "../../interfaces/page";
import { BlockPlugin } from "../../interfaces/plugin";
import BlockElement from "./BlockElement.vue";
import { emitter } from "./../../services/emitter";
import { UploadSettings } from "../../interfaces/upload";
import columnsPlugin from "./dummy-plugins/columns";

const props = defineProps<{
  modelValue: BlockPage;
  readOnly: boolean;
  plugins: BlockPlugin[];
  debug?: boolean;
  showAllBlockControls?: boolean;
  uploadSettings?: UploadSettings;
}>();
const emit = defineEmits(['update:modelValue']);

// add native function columns
const allPlugins: BlockPlugin[] = props.plugins.concat(columnsPlugin);

const page = ref(props.modelValue);
watch(props, () => {
  page.value = props.modelValue;
}); // ??? nessesary?
watch(page, () => {
  emit('update:modelValue', page.value);
});

// create addMenu and editMenu entries (fixed)
const blocksToAdd: AddMenuEntry[] = [];
const customEntriesEditMenu: EditMenuEntry[] = [];

allPlugins.forEach(plugin => {
  // add entry to addMenu
  if (plugin.menuExtension?.addMenuEntry) blocksToAdd.push({
    value: plugin.name,
    label: plugin.menuExtension.addMenuEntry.label,
    icon: plugin.menuExtension.addMenuEntry.icon,
  })
  // add entry to editMenu
  if (plugin.menuExtension?.editMenuTemplate) customEntriesEditMenu.push({
    name: plugin.name,
    template: plugin.menuExtension.editMenuTemplate,
  });
});

// sort by label
blocksToAdd.sort((a, b) => a.label.localeCompare(b.label));

// handle add/drop/update block
const defineEmptyBlock = (type: string) => {
  const plugin = allPlugins.find(p => p.name === type);
  if (!plugin) throw new Error(`Plugin ${type} not found`);
  const item = plugin.emptyBlock();
  // deep copy
  return JSON.parse(JSON.stringify(item));
};

/**
 * add a new block by row and column index
 * or add a block by block object 
 */
const addBlock = (data: { type?: string; rowIndex: number; colIndex: number; childIndex: number; block?: UniversalBlock }) => {
  if (data.type) {
    // add to column
    if (data.colIndex > -1 && data.childIndex > -1) {
      // add a new item in the block list of the column
      const item = page.value.blocks[data.rowIndex] as BlockColumns;
      item.data.columns[data.colIndex].data.blocks.splice(data.childIndex + 1, 0, defineEmptyBlock(data.type));
    }
    // add new row
    else {
      page.value.blocks.splice(data.rowIndex + 1, 0, defineEmptyBlock(data.type));
    }
  } else if (data.block) {
    page.value.blocks.splice(data.rowIndex + 1, 0, data.block);
  }
};
const dropBlock = (index: number) => {
  if (page.value.blocks.length === 1) return; // don't drop last block (at least one block is required)
  page.value.blocks.splice(index, 1);
};
const updateBlock = (data: { block: UniversalBlock }, index: number) => {
  page.value.blocks[index] = data.block;
};
const movePosition = (data: { direction: number; }, index: number) => {
  if (index === -1) return;
  const newIndex = index + data.direction;
  if (newIndex < 0 || newIndex >= page.value.blocks.length) return;
  const block = page.value.blocks[index];
  page.value.blocks.splice(index, 1);
  page.value.blocks.splice(newIndex, 0, block);
}

// handle hide menus
const hideControls = () => {
  emitter.emit("hide-controls");
};

// main page style
const padding = computed(() => {
  const padding = page.value.style?.padding ?? { top: "30px", right: "30px", bottom: "30px", left: "30px", };
  return `${padding.left} ${padding.top} ${padding.right} ${padding.bottom}`;
});
const width = computed(() => page.value.style?.width ?? "90%");
const background = computed(() => page.value.style?.background ?? "#fffff9");
</script>

<style scoped>
#page-editor {
  padding-top: 10px;
  width: 100%;
  height: 100vh;
  background: #f8f8f8;
  overflow-y: scroll;
}

#page-container {
  width: v-bind(width);
  margin: 0 auto;
}

#page {
  padding: v-bind(padding);
  background: v-bind(background);
  border-radius: 5px;
}
</style>