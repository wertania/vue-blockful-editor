<template>
  <!-- debug: show index -->
  <div v-if="debug" :data-block-key="block.key">{{ 'i: ' + index }}</div>

  <!-- fixed position menu to add elemens -->
  <AddMenu
    :top="posMenuTop"
    :left="posMenuLeft"
    v-if="!readOnly && showAddMenu"
    @close="showAddMenu = false"
    @add="addItem($event)"
    :blocksToAdd="blocksToAdd"
  />

  <!-- fixed position menu to edit elements -->
  <EditMenu
    :top="posMenuTop"
    :left="posMenuLeft"
    v-if="!readOnly && showEditMenu && editColumnIndex === -1"
    @close="showEditMenu = false"
    @drop="deleteBlock"
    v-model="blockVar"
    :customEntriesEditMenu="customEntriesEditMenu"
    @delete="deleteBlock"
  />

  <!-- MAIN ENTRY BLOCK in Editor Mode -->
  <div
    class="flex"
    :class="(marginTop, marginBottom)"
    @mouseover="toggleBlockButtons($event, true)"
    @mouseleave="toggleBlockButtons($event, false)"
  >
    <!-- EDIT COLUMN HINT -->
    <div v-if="!readOnly" class="w-1/12 h-5">
      <!-- first row: add, edit -->
      <div class="flex w-full" v-if="showBlockButtons || showAllBlockControls">
        <i
          data-func="openMenu"
          class="fa-solid fa-plus text-xl w-18 ml-0 hover:bg-gray-200 hover:rounded"
          @click="openAddMenu($event)"
        />
        <i
          data-func="openMenu"
          class="fa-solid fa-wrench text-xl w-18 ml-1 hover:bg-gray-200 hover:rounded"
          @click="openEditMenu($event)"
        />
      </div>
      <!-- second row: move up, down -->
      <div
        class="flex w-full mt-2 text-gray-500"
        v-if="showBlockButtons || showAllBlockControls"
      >
        <i
          class="fa-solid fa-caret-up text-xl w-18 ml-0 hover:bg-gray-200 hover:rounded"
          @click="emit('move', { direction: -1, index: props.index })"
        />
        <i
          class="fa-solid fa-caret-down text-xl w-18 ml-2 hover:bg-gray-200 hover:rounded"
          @click="emit('move', { direction: 1, index: props.index })"
        />
      </div>
    </div>
    <!-- RENDER BLOCK(S) -->
    <!-- main column. width depends on mode readOnly -->
    <div
      :class="{
        'w-11/12': !readOnly,
        'w-full': readOnly,
        marginTop: true,
        marginBottom: true,
      }"
      @drop="dropItem($event)"
      @dragover.prevent
      @dragenter.prevent
    >
      <!-- single block mode: means a block will be rendered by its wrapper -->
      <PluginWrapper
        v-if="blockVar.type !== 'columns'"
        v-for="plugin in plugins"
        :key="plugin.name"
        v-model="blockVar"
        :plugin="plugin"
        :readOnly="readOnly"
        :debug="debug"
        :uploadSettings="
          plugin.optionalProperties?.useUploadSettings
            ? uploadSettings
            : undefined
        "
      />

      <!-- column mode: means a list of columns and blocks will be rendered -->
      <div
        v-if="blockVar.type === 'columns'"
        class="grid gap-20"
        :class="{
          'grid-cols-1': blockVar.data.columns.length === 1,
          'grid-cols-2': blockVar.data.columns.length === 2,
          'grid-cols-3': blockVar.data.columns.length === 3,
          'grid-cols-4': blockVar.data.columns.length === 4,
          'grid-cols-5': blockVar.data.columns.length === 5,
          'grid-cols-6': blockVar.data.columns.length === 6,
        }"
      >
        <div
          v-for="(column, column_i) in blockVar.data.columns"
          :key="column_i"
          class="relative"
        >
          <!-- nested columns blocks are not possible for now! so check for inner type "columns" -->

          <!-- render all items of column -->
          <div
            v-if="column.data.blocks.length > 0"
            v-for="(child, child_i) in column.data.blocks"
          >
            <!-- render wrapper if block for all valid blocks != "empty" -->
            <PluginWrapper
              v-if="child.type !== 'columns' && child.type !== 'empty'"
              v-for="plugin in plugins"
              :key="plugin.name"
              :modelValue="child"
              @update:modelValue="
                if (blockVar.type === 'columns')
                  blockVar.data.columns[column_i].data.blocks[child_i] = $event;
              "
              :plugin="plugin"
              :readOnly="readOnly"
              :debug="debug"
              :uploadSettings="
                plugin.optionalProperties?.useUploadSettings
                  ? uploadSettings
                  : undefined
              "
            />
            <!-- render edit icon for blocks within columns -->
            <i
              v-if="showBlockButtons === true"
              class="fa-solid fa-wrench text-xl absolute top-0 left-[-25px] hover:bg-gray-200 hover:rounded"
              @click="openEditMenuInColumn($event, column_i, child_i)"
            />

            <!-- render edit menu for blocks within columns -->
            <EditMenu
                :top="posMenuTop"
                :left="posMenuLeft"
                v-if="!readOnly && showEditMenu && editColumnIndex === column_i && editBlockIndex === child_i"
                @close="showEditMenu = false"
                @drop="emit('drop', true)"
                v-model="blockVar.data.columns[column_i].data.blocks[child_i]"
                :customEntriesEditMenu="customEntriesEditMenu"
                @delete="deleteItem(column_i, child_i)"
                />
          </div>
          <!-- show placeholder for all empty blocks (empty blocks are column placeholders) -->
          <NoContentPlaceholder
            v-else
            @click="openAddMenu($event, column_i, 0)"
          />
        </div>
      </div>
      <!-- end column mode -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { DragNDropData } from '../../interfaces/dragndrop';
import { AddMenuEntry, EditMenuEntry } from '../../interfaces/menu';
import { UniversalBlock } from '../../interfaces/page';
import { BlockPlugin } from '../../interfaces/plugin';
import { UploadSettings } from '../../interfaces/upload';
import { emitter } from './../../services/emitter';
import NoContentPlaceholder from './dummy-plugins/NoContentPlaceholder.vue';
import AddMenu from './Menu/AddMenu.vue';
import EditMenu from './Menu/EditMenu.vue';
import PluginWrapper from './PluginWrapper.vue';

const props = defineProps<{
  block: UniversalBlock;
  index: number;
  readOnly: boolean;
  plugins: BlockPlugin[];
  blocksToAdd: AddMenuEntry[];
  debug?: boolean;
  customEntriesEditMenu: EditMenuEntry[];
  showAllBlockControls?: boolean;
  uploadSettings?: UploadSettings;
}>();

const emit = defineEmits(['add', 'update', 'drop', 'move', 'delete']);

const blockVar = ref(props.block);
watch(blockVar, () => {
  emit('update', { block: blockVar.value });
});
watch(props, () => {
  blockVar.value = props.block;
});

// Menus
const showBlockButtons = ref(false);
const showAddMenu = ref(false);
const showEditMenu = ref(false);
const posMenuTop = ref(0);
const posMenuLeft = ref(0);
const editColumnIndex = ref(-1);
const editBlockIndex = ref(-1);

const toggleBlockButtons = (e: MouseEvent, val?: boolean) => {
  if (val !== undefined) showBlockButtons.value = val;
  else showBlockButtons.value = !showBlockButtons.value;
};

const openAddMenu = (e: MouseEvent, colIndex?: number, childIndex?: number) => {
  showEditMenu.value = false; // close other menu in this component if opened
  emitter.emit('close-other-menus', props.index); // close other menus in editor

  const node = e.target as HTMLElement;
  const { bottom, left } = node.getBoundingClientRect();
  posMenuTop.value = bottom;
  posMenuLeft.value = left;
  showAddMenu.value = true;

  if (colIndex !== undefined) selColAndChild.value[0] = colIndex;
  if (childIndex !== undefined) selColAndChild.value[1] = childIndex;
  // childIndex is only set if block is empty (no column
  else selColAndChild.value = [-1, -1]; // -1 means add block to row (not to column
};

const openEditMenu = (e: MouseEvent, colIndex?: number, childIndex?: number) => {
  showAddMenu.value = false; // close other menu in this component if opened
  emitter.emit('close-other-menus', props.index); // close other menus in editor

  const node = e.target as HTMLElement;
  const { bottom, left } = node.getBoundingClientRect();
  posMenuTop.value = bottom;
  posMenuLeft.value = left;
  showEditMenu.value = true;
  editColumnIndex.value = colIndex !== undefined ? colIndex : -1;
  editBlockIndex.value = childIndex !== undefined ? childIndex : -1;
};

const openEditMenuInColumn = (e: MouseEvent, columnIndex: number, childIndex: number) => {
  showAddMenu.value = false; // close other menu in this component if opened
  emitter.emit('close-other-menus', props.index); // close other menus in editor

  const node = e.target as HTMLElement;
  const { bottom, left } = node.getBoundingClientRect();
  posMenuTop.value = bottom;
  posMenuLeft.value = left;
  showEditMenu.value = true;
  editColumnIndex.value = columnIndex;
  editBlockIndex.value = childIndex;
};

const deleteItem = (columnIndex?: number, childIndex?: number) => {
  if (blockVar.value.type === 'columns' && blockVar.value.data.columns) {
    if (columnIndex !== undefined && childIndex !== undefined) {
      // delete single item in column
      blockVar.value.data.columns[columnIndex].data.blocks.splice(childIndex, 1);
    } else if (columnIndex !== undefined) {
      // delete column
      blockVar.value.data.columns.splice(columnIndex, 1);
    }
  } else {
    // delete item
    emit('drop', props.index);
  }
  emit('update', { block: blockVar.value });
};

const deleteBlock = () => {
  emit('drop', props.index);
};

let selColAndChild = ref([-1, -1]);
const addItem = (type: string) => {
  showAddMenu.value = false;
  emit('add', {
    type,
    rowIndex: props.index,
    colIndex: selColAndChild.value[0],
    childIndex: selColAndChild.value[1],
  }); // forward event to parent and close menu
};

const dropItem = (e: DragEvent) => {
  const data = e.dataTransfer?.getData('data');
  if (data) {
    const dde = JSON.parse(data) as DragNDropData;
    // console.log("drop data", dde);
    if (dde.type === 'block' && dde.action === 'add') {
      emit('add', { block: dde.data, rowIndex: props.index });
    }
  }
};

// styling
const marginTop = computed(() => {
  let margin = 'm-0';
  if (blockVar.value.style?.spaceTop === 1) margin = 'mt-1';
  if (blockVar.value.style?.spaceTop === 2) margin = 'mt-2';
  if (blockVar.value.style?.spaceTop === 3) margin = 'mt-3';
  if (blockVar.value.style?.spaceTop === 4) margin = 'mt-4';
  if (blockVar.value.style?.spaceTop === 5) margin = 'mt-5';
  return margin;
});

const marginBottom = computed(() => {
  let margin = 'm-0';
  if (blockVar.value.style?.spaceBottom === 1) margin = 'mb-1';
  if (blockVar.value.style?.spaceBottom === 2) margin = 'mb-2';
  if (blockVar.value.style?.spaceBottom === 3) margin = 'mb-3';
  if (blockVar.value.style?.spaceBottom === 4) margin = 'mb-4';
  if (blockVar.value.style?.spaceBottom === 5) margin = 'mb-5';
  return margin;
});

emitter.on('hide-controls', () => {
  showBlockButtons.value = false;
});

emitter.on('close-other-menus', (index: any) => {
  if (index !== props.index) {
    showAddMenu.value = false;
    showEditMenu.value = false;
  }
});
</script>
