import { UniversalBlock } from '../../interfaces/page';

export interface BlockData_Delimiter {
  // no data
}

export type BlockDelimiter = UniversalBlock<'delimiter'>

declare module 'vue-blockful-editor/blocks' {
  interface BlockDefinitions {
    delimiter: BlockData_Delimiter
  }
}
