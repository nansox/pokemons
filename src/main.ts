import { createApp } from 'vue'
import App from '@/common/views/App.vue'
import router from '@/common/router'
import i18n from '@/common/i18n'
import { store } from '@/common/store/index'
import '@/assets/main.css'

createApp(App).use(router).use(i18n).use(store).mount('#app')
