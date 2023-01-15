
// Whole page
export interface BlockPage {
    creator: string;
    title: string;
    meta?: {
        lastChange: string;
        lastChangeBy: string;
    };
    blocks: Block[];
    style?: {
        // CSS styles in string format
        width?: string;
        background?: string;
        padding?: {
            top: string;
            bottom: string;
            left: string;
            right: string;
        }
    }
}

// Block definition
export type BlockType = 'paragraph' | 'header' | 'image' | 'embed' | 'delimiter' | 'richtext' | string; // | 'list' | 'quote' | 'code' | 'table';

export type BlockBase = {
    type: BlockType;
    style: {
        spaceTop: number;
        spaceBottom: number;
    }
}

export interface BlockData_Paragraph {
    text: string;
    textAlign: 'left' | 'center' | 'right';
    fontSize: string;
}

export interface BlockData_Header {
    text: string;
    textAlign: 'left' | 'center' | 'right';
    level: number;
}

export interface BlockData_Image {
    src: string;
    width?: string;
    textAlign?: 'left' | 'center' | 'right';
}

export interface BlockData_Embed {
    src: string;
    height: string;
    width: string;
    align: 'left' | 'center' | 'right';
}

export interface BlockData_Delimiter {
    // no data
}

export interface BlockData_RichText {
    html: string;
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

export interface BlockRichText extends BlockBase {
    type: 'delimiter';
    data: BlockData_RichText;
}

// main object
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
} | {
    type: 'richtext';
    data: BlockData_RichText;
}

export type Block = BlockBase & BlockTypeSpecific;