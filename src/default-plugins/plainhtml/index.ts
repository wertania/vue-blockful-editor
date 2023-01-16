import { BlockData_PlainHtml, BlockPlainHtml } from "./types";
import MenuExtEdit from "./menu-ext-edit.vue";
import Block from "./block.vue";
import { BlockPlugin } from "../../interfaces/plugin";

const name = 'plainhtml';
const emptyData: BlockData_PlainHtml = {
    html: ''
};

export default <BlockPlugin>{
    name: name,
    block: Block,
    emptyBlock: () => <BlockPlainHtml>{
        type: name,
        style: {
            spaceTop: 0,
            spaceBottom: 3,
        },
        data: emptyData,
    },
    menuExtension: {
        addMenuEntry: {
            icon: 'fa-solid fa-code',
            label: 'Plain HTML',
        },
        editMenuTemplate: MenuExtEdit,
    }
};