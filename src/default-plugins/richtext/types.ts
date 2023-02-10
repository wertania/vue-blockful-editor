import { UniversalBlock } from "../../interfaces/page";

export interface BlockData_RichText {
    html: string;
}

export interface BlockRichText extends UniversalBlock {
    type: 'richtext';
    data: BlockData_RichText;
}