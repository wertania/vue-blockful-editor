import { createApp } from 'vue';
// import mitt from 'mitt';
import './style.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import App from './App.vue';

import clickOutside from './directives/vue-directive-clickOutside';

// export const emitter = mitt();

const app = createApp(App);
app.directive('click-outside', clickOutside);
// app.config.globalProperties.emitter = emitter;

app.mount('#app');
