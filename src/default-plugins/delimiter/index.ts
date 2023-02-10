import Block from "./block.vue";
import { BlockDelimiter } from "./types";
import { BlockPlugin } from "../../interfaces/plugin";

const name = 'delimiter';
const emptyData: BlockDelimiter = {
    type: name,
    style: {
        spaceTop: 0,
        spaceBottom: 3,
    },
    data: {},
};

export default <BlockPlugin>{
    name: name,
    block: Block,
    emptyBlock: () => emptyData,
    menuExtension: {
        addMenuEntry: {
            icon: 'fa-solid fa-minus',
            label: 'Delimiter',
        },
    }
};