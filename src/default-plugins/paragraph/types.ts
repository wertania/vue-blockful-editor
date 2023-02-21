import { UniversalBlock } from '../../interfaces/page';

export interface BlockData_Paragraph {
  text: string;
  textAlign: 'left' | 'center' | 'right';
  fontSize: string;
}

export interface BlockParagraph extends UniversalBlock {
  type: 'paragraph';
  data: BlockData_Paragraph;
}
