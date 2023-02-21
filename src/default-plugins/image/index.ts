import MenuExtEdit from './menu-ext-edit.vue';
import Block from './block.vue';
import { BlockImage } from './types';
import { BlockPlugin } from '../../interfaces/plugin';

const name = 'image';
const emptyData: BlockImage = {
  type: name,
  style: {
    spaceTop: 0,
    spaceBottom: 3,
  },
  data: {
    src: '',
    // width: '100%',
    // textAlign: 'left',
  },
};

export default <BlockPlugin>{
  name: name,
  block: Block,
  emptyBlock: () => emptyData,
  menuExtension: {
    addMenuEntry: {
      icon: 'fa-solid fa-image',
      label: 'Image',
    },
    editMenuTemplate: MenuExtEdit,
  },
  optionalProperties: {
    useUploadSettings: true,
  },
};
