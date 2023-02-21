import Block from './block.vue';
import { BlockRichText } from './types';
import { BlockPlugin } from '../../interfaces/plugin';

const name = 'richtext';
const emptyData: BlockRichText = {
  type: name,
  style: {
    spaceTop: 0,
    spaceBottom: 3,
  },
  data: {
    html: '',
  },
};

export default <BlockPlugin>{
  name: name,
  block: Block,
  emptyBlock: () => emptyData,
  menuExtension: {
    addMenuEntry: {
      icon: 'fa-solid fa-file-lines',
      label: 'Rich Text',
    },
  },
};
