import { UniversalBlock } from '../../interfaces/page';

export interface BlockData_Embed {
  src: string;
  height?: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
  scroll?: 'xy' | 'y' | 'x' | 'no';
}

export type BlockEmbed = UniversalBlock<'embed'>;

declare module 'vue-blockful-editor/blocks' {
  interface BlockDefinitions {
    embed: BlockData_Embed;
  }
}
