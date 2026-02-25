import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia'
const pinia = createPinia()
const app = createApp(App).use(router).use(ElementPlus,{size:'small'}).use(pinia);
import './assets/main.css'
import 'element-plus/dist/index.css'
import myDirectives  from './directives';
app.directive('myslide-in',myDirectives.directives['myslide-in']);
// Promise 错误处理器
window.addEventListener('unhandledrejection', event => {
    console.warn(event.reason)
});

app.mount('#app')
