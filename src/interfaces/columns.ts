import { UniversalBlock } from './page';

export interface Column {
  type: 'column';
  data: {
    blocks: UniversalBlock[];
  };
}

export interface BlockColumns {
  type: 'columns';
  data: {
    columns: Column[];
  };
}
