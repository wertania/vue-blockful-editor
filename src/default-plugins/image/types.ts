import { UniversalBlock } from '../../interfaces/page';

export interface BlockData_Image {
  src: string;
  width?: string;
  textAlign?: 'left' | 'center' | 'right';
}

export type BlockImage = UniversalBlock<'image'>;

declare module 'vue-blockful-editor/blocks' {
  interface BlockDefinitions {
    image: BlockData_Image;
  }
}
