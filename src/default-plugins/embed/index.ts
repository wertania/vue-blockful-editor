import MenuExtEdit from "./menu-ext-edit.vue";
import Block from "./block.vue";
import { BlockEmbed } from "./types";
import { BlockPlugin } from "../../interfaces/plugin";

const name = 'embed';
const emptyData: BlockEmbed = {
    type: name,
    style: {
        spaceTop: 0,
        spaceBottom: 3,
    },
    data: {
        src: '',
        align: 'left',
        width: '100%',
        height: 'auto',
    },
};

export default <BlockPlugin>{
    name: name,
    block: Block,
    emptyBlock: () => emptyData,
    menuExtension: {
        addMenuEntry: {
            icon: 'fa-solid fa-code',
            label: 'HTML page',
        },
        editMenuTemplate: MenuExtEdit,
    }
};