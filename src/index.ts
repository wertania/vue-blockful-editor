// export vue component and plugins
import { App, Plugin } from 'vue';
import BlockEditor from './components/Editor/BlockEditor.vue';
import PluginPlainHtml from './default-plugins/plainhtml';
import PluginDelimiter from './default-plugins/delimiter';
import PluginEmbed from './default-plugins/embed';
import PluginHeader from './default-plugins/header';
import PluginImage from './default-plugins/image';
import PluginParagraph from './default-plugins/paragraph';
import PluginRichText from './default-plugins/richtext';

export default {
  install(Vue: App) {
    Vue.component('block-editor', BlockEditor);
  },
} as Plugin;

export {
  BlockEditor,
  PluginPlainHtml,
  PluginDelimiter,
  PluginEmbed,
  PluginHeader,
  PluginImage,
  PluginParagraph,
  PluginRichText,
};

export * from './interfaces/page';

export * from './default-plugins/delimiter';
export * from './default-plugins/embed';
export * from './default-plugins/header';
export * from './default-plugins/image';
export * from './default-plugins/paragraph';
export * from './default-plugins/plainhtml';
export * from './default-plugins/richtext';
export * from './interfaces/columns';

export * from './default-plugins/delimiter/types';
export * from './default-plugins/embed/types';
export * from './default-plugins/header/types';
export * from './default-plugins/image/types';
export * from './default-plugins/paragraph/types';
export * from './default-plugins/plainhtml/types';
export * from './default-plugins/richtext/types';

import { BlockDefinitions } from 'vue-blockful-editor/blocks';
export type BlockType = keyof BlockDefinitions;
