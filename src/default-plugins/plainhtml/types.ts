import { UniversalBlock } from '../../interfaces/page';

export interface BlockData_PlainHtml {
  html: string;
}

export type BlockPlainHtml = UniversalBlock<'plainhtml'>;

declare module 'vue-blockful-editor/blocks' {
  interface BlockDefinitions {
    plainhtml: BlockData_PlainHtml;
  }
}
