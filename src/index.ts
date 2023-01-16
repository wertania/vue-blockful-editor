// export vue component

import BlockEditor from "./components/Editor/BlockEditor.vue";
import { App, Plugin } from 'vue';

export default {
    install(Vue: App) {
        Vue.component('block-editor', BlockEditor)
    }
} as Plugin

export {
    BlockEditor
}