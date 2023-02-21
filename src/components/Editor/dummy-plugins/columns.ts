// native plugin dummy. will be rendered as a special case
// needed only for menu extensions and empty block creation
import { UniversalBlock } from '../../../interfaces/page';
import EditMenuExtColumns from './ColumnsEditMenuExt.vue';

const name = 'columns';
export default {
  name,
  block: null as any, // this plugin has no own block renderer!
  emptyBlock: () => {
    return {
      type: name,
      data: {
        columns: [
          { type: 'column', data: { blocks: [] } },
          { type: 'column', data: { blocks: [] } },
        ],
      },
      style: {
        spaceBottom: 1,
        spaceTop: 0,
      },
    };
  },
  menuExtension: {
    addMenuEntry: {
      icon: 'fa-solid fa-table-columns',
      label: 'Columns',
      value: name,
    },
    editMenuTemplate: EditMenuExtColumns,
  },
};
