import { UniversalBlock } from '../../interfaces/page';

export interface BlockData_RichText {
  html: string;
}

export type BlockRichText = UniversalBlock<'richtext'>;

declare module 'vue-blockful-editor/blocks' {
  interface BlockDefinitions {
    richtext: BlockData_RichText;
  }
}
