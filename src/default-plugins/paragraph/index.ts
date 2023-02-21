import MenuExtEdit from './menu-ext-edit.vue';
import Block from './block.vue';
import { BlockParagraph } from './types';
import { BlockPlugin } from '../../interfaces/plugin';

const name = 'paragraph';
const emptyData: BlockParagraph = {
  type: name,
  style: {
    spaceTop: 0,
    spaceBottom: 3,
  },
  data: {
    text: '',
    textAlign: 'left',
    fontSize: '1em',
  },
};

export default <BlockPlugin>{
  name: name,
  block: Block,
  emptyBlock: () => emptyData,
  menuExtension: {
    addMenuEntry: {
      icon: 'fa-solid fa-paragraph',
      label: 'Paragraph',
    },
    editMenuTemplate: MenuExtEdit,
  },
};
