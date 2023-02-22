import { createApp } from 'vue';
// import mitt from 'mitt';
import './style.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import App from './App.vue';

// export const emitter = mitt();

const app = createApp(App);
// app.config.globalProperties.emitter = emitter;

app.mount('#app');
