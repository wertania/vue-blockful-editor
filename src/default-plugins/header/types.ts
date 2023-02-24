import { UniversalBlock } from '../../interfaces/page';

export interface BlockData_Header {
  text: string;
  textAlign?: 'left' | 'center' | 'right';
  level: number;
}

export type BlockHeader = UniversalBlock<'header'>;

declare module 'vue-blockful-editor/blocks' {
  interface BlockDefinitions {
    header: BlockData_Header;
  }
}
