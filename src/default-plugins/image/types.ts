import { UniversalBlock } from "../../interfaces/page";

export interface BlockData_Image {
    src: string;
    width?: string;
    textAlign?: 'left' | 'center' | 'right';
}

export interface BlockImage extends UniversalBlock {
    type: 'image';
    data: BlockData_Image;
}