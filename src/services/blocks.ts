import { Block, BlockRichText, BlockType } from "../interfaces/blocks";

export const defineEmptyBlock = (type: BlockType): Block => {
    console.log('defineEmptyBlock', type);
    const data: Block = {
        type,
        data: {} as any,
        style: {
            spaceTop: 0,
            spaceBottom: 3,
        }
    };

    if (data.type === 'paragraph') {
        data.data.text = '';
        data.data.textAlign = 'left';
        data.data.fontSize = "1em";
    } else if (data.type === 'header') {
        data.data.text = 'Header';
        data.data.level = 1;
    } else if (data.type === 'image') {
        data.data.src = '';
        data.data.width = "100%";
        data.data.textAlign = 'left';
    } else if (data.type === 'embed') {
        data.data.src = '';
    } else if (type === 'delimiter') {
        // no data
    } else if (type === 'richtext') {
        (data as BlockRichText).data.html = '';
    }

    return data;
}