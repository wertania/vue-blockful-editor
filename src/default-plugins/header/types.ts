import { UniversalBlock } from '../../interfaces/page';

export interface BlockData_Header {
  text: string;
  textAlign: 'left' | 'center' | 'right';
  level: number;
}

export interface BlockHeader extends UniversalBlock {
  type: 'header';
  data: BlockData_Header;
}
