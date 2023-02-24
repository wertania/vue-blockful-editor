import { UniversalBlock } from '../../interfaces/page';

export interface BlockData_Paragraph {
  text: string;
  textAlign: 'left' | 'center' | 'right';
  fontSize?: string;
}

export type BlockParagraph = UniversalBlock<'paragraph'>;

declare module 'vue-blockful-editor/blocks' {
  interface BlockDefinitions {
    paragraph: BlockData_Paragraph;
  }
}
