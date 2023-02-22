import { Component } from 'vue';
import { UniversalBlock } from './page';

// Plugin Support for Blocks
export interface BlockPlugin {
  name: string; // descriptive the type-name of the new block type e.g. 'paragraph'
  block: Component; // a Vue component that renders the block, will have a prop 'modelValue' of type Block
  emptyBlock: () => UniversalBlock; // a function that returns a new empty block of this type
  menuExtension?: {
    addMenuEntry?: {
      icon: string; // e.g. 'fa-solid fa-some-icon'
      label: string; // e.g. 'Paragraph'
      // value will be set automatically
    };
    addMenuTemplate?: Component; // optional Vue component that will be shown in the add menu
    editMenuTemplate?: Component; // optional Vue component that will be shown in the edit menu
  };
  optionalProperties?: {
    useUploadSettings?: boolean;
  };
}
