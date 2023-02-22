import { UniversalBlock } from '../../interfaces/page';

export interface BlockData_Delimiter {
  // no data
}

export interface BlockDelimiter extends UniversalBlock {
  type: 'delimiter';
  data: BlockData_Delimiter;
}
