
// Whole page
export interface BlockPage {
    creator: string;
    title: string;
    lastChange: string;
    lastChangeBy: string;
    blocks: Block[];
}

// Block definition
export type BlockType = 'paragraph' | 'header' | 'image' | 'embed' | 'delimiter'; // | 'list' | 'quote' | 'code' | 'table';

type BlockBase = {
    type: BlockType;
    style: {
        spaceTop: number;
        spaceBottom: number;
    }
}

export interface BlockData_Paragraph {
    text: string;
    textAlign: 'left' | 'center' | 'right';
    fontSize: number;
}

export interface BlockData_Header {
    text: string;
    textAlign: 'left' | 'center' | 'right';
    level: number;
}

export interface BlockData_Image {
    src: string;
    width: null | number;
    textAlign: 'left' | 'center' | 'right';
}

export interface BlockData_Embed {
    src: string;
}

export interface BlockData_Delimiter {
    // no data
}

// mapping of BlockType to BlockData
export type BlockTypeSpecific = {
    type: 'paragraph';
    data: BlockData_Paragraph;
} | {
    type: 'header';
    data: BlockData_Header;
} | {
    type: 'image';
    data: BlockData_Image;
} | {
    type: 'embed';
    data: BlockData_Embed;
} | {
    type: 'delimiter';
    data: BlockData_Delimiter;
}

export interface BlockParagraph extends BlockBase {
    type: 'paragraph';
    data: BlockData_Paragraph;
}

export interface BlockHeader extends BlockBase {
    type: 'header';
    data: BlockData_Header;
}

export interface BlockImage extends BlockBase {
    type: 'image';
    data: BlockData_Image;
}

export interface BlockEmbed extends BlockBase {
    type: 'embed';
    data: BlockData_Embed;
}

export interface BlockDelimiter extends BlockBase {
    type: 'delimiter';
    data: BlockData_Delimiter;
}

// main object
export type Block = BlockBase & BlockTypeSpecific;