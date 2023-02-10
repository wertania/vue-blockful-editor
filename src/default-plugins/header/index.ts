import MenuExtEdit from "./menu-ext-edit.vue";
import Block from "./block.vue";
import { BlockHeader } from "./types";
import { BlockPlugin } from "../../interfaces/plugin";

const name = 'header';
const emptyData: BlockHeader = {
    type: name,
    style: {
        spaceTop: 0,
        spaceBottom: 3,
    },
    data: {
        text: '',
        level: 1,
        textAlign: 'left',
    },
};

export default <BlockPlugin>{
    name: name,
    block: Block,
    emptyBlock: () => emptyData,
    menuExtension: {
        addMenuEntry: {
            icon: 'fa-solid fa-heading',
            label: 'Header',
        },
        editMenuTemplate: MenuExtEdit,
    }
};