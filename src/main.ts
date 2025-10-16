import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
// core
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


// css
import './style.css'
import 'element-plus/dist/index.css'
import '@/styles/index.scss'


const app = createApp(App)

// 注册插件
app.use(createPinia)
app.use(router)
app.use(ElementPlus)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.mount('#app')