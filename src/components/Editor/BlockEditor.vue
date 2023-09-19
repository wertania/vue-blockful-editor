<template>
  <BlockElement v-for="(block, i) of page.blocks" :key="i" :block="block" :index="i" @add="addBlock($event)"
    @drop="dropBlock(i)" @update="updateBlock($event, i)" :readOnly="readOnly" :debug="debug" :plugins="allPlugins"
    :blocksToAdd="blocksToAdd" :customEntriesEditMenu="customEntriesEditMenu" :showAllBlockControls="showAllBlockControls"
    @move="movePosition($event, i)" :uploadSettings="uploadSettings" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { AddMenuEntry, EditMenuEntry } from '../../interfaces/menu';
import { BlockColumns } from '../../interfaces/columns';
import { BlockPage, UniversalBlock } from '../../interfaces/page';
import { BlockPlugin } from '../../interfaces/plugin';
import BlockElement from './BlockElement.vue';
import { UploadSettings } from '../../interfaces/upload';
import columnsPlugin from './dummy-plugins/columns';

const props = defineProps<{
  modelValue: BlockPage;
  readOnly: boolean;
  plugins: BlockPlugin[];
  debug?: boolean;
  showAllBlockControls?: boolean;
  uploadSettings?: UploadSettings;
  disableColumns?: boolean;
}>();
const emit = defineEmits(['update:modelValue']);

// add native function columns
const allPlugins: BlockPlugin[] = props.disableColumns ? props.plugins : props.plugins.concat(columnsPlugin);

const page = computed({
  get: () => props.modelValue,
  set: (updated) => emit('update:modelValue', updated),
});

// create addMenu and editMenu entries (fixed)
const blocksToAdd: AddMenuEntry[] = [];
const customEntriesEditMenu: EditMenuEntry[] = [];

allPlugins.forEach((plugin) => {
  // add entry to addMenu
  if (plugin.menuExtension?.addMenuEntry)
    blocksToAdd.push({
      value: plugin.name,
      label: plugin.menuExtension.addMenuEntry.label,
      icon: plugin.menuExtension.addMenuEntry.icon,
    });
  // add entry to editMenu
  if (plugin.menuExtension?.editMenuTemplate)
    customEntriesEditMenu.push({
      name: plugin.name,
      template: plugin.menuExtension.editMenuTemplate,
    });
});

// sort by label
blocksToAdd.sort((a, b) => a.label.localeCompare(b.label));

// handle add/drop/update block
const defineEmptyBlock = (type: string) => {
  const plugin = allPlugins.find((p) => p.name === type);
  if (!plugin) throw new Error(`Plugin ${type} not found`);
  const item = plugin.emptyBlock();
  // deep copy
  return JSON.parse(JSON.stringify(item));
};

/**
 * add a new block by row and column index
 * or add a block by block object
 */
const addBlock = (data: {
  type?: string;
  rowIndex: number;
  colIndex: number;
  childIndex: number;
  block?: UniversalBlock;
}) => {
  if (data.type) {
    // add to column
    if (data.colIndex > -1 && data.childIndex > -1) {
      // add a new item in the block list of the column
      const item = page.value.blocks[data.rowIndex] as BlockColumns;
      item.data.columns[data.colIndex].data.blocks.splice(
        data.childIndex + 1,
        0,
        defineEmptyBlock(data.type),
      );
    }
    // add new row
    else {
      page.value.blocks.splice(
        data.rowIndex + 1,
        0,
        defineEmptyBlock(data.type),
      );
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
const movePosition = (data: { direction: number }, index: number) => {
  if (index === -1) return;
  const newIndex = index + data.direction;
  if (newIndex < 0 || newIndex >= page.value.blocks.length) return;
  const block = page.value.blocks[index];
  page.value.blocks.splice(index, 1);
  page.value.blocks.splice(newIndex, 0, block);
};
</script>
