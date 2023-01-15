import { UniversalBlock } from "../../interfaces/page";

export interface BlockData_Embed {
    src: string;
    height: string;
    width: string;
    align: 'left' | 'center' | 'right';
}

export interface BlockEmbed extends UniversalBlock {
    type: 'embed';
    data: BlockData_Embed;
}