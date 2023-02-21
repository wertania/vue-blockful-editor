import { UniversalBlock } from '../../interfaces/page';

export interface BlockData_PlainHtml {
  html: string;
}

export interface BlockPlainHtml extends UniversalBlock {
  type: 'plainhtml';
  data: BlockData_PlainHtml;
}
