import { UniversalBlock } from './page';

export type Column = UniversalBlock<'column'>;

export type BlockColumns = UniversalBlock<'columns'>;

declare module 'vue-blockful-editor/blocks' {
  interface BlockDefinitions {
    column: { blocks: UniversalBlock[] };
    columns: { columns: Column[] };
  }
}
