/*
 * @Descripttion: 
 * @Author: yu@w
 * @Date: 2023-04-04 10:40:40
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import day from 'dayjs'
import './assets/main.css'



import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';





const app = createApp(App)

app.config.globalProperties.$dayjs = day


app.use(router)
app.use(Antd)
app.mount('#app')
