import { createApp } from 'vue'
import App from './views/app/App.vue'
import router from './router'
import { i18n } from './infraestructure/i18n'
import { primeVue } from './infraestructure/primeVue';
import { library } from '@fortawesome/fontawesome-svg-core' 
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome' 
import { fas } from '@fortawesome/free-solid-svg-icons' 
import { far } from '@fortawesome/free-regular-svg-icons' 
import { fab } from '@fortawesome/free-brands-svg-icons' 
import 'primeflex/primeflex.css';

import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
 
library.add(fas, far, fab)

const app = createApp(App);

app.use(router)
.component('font-awesome-icon', FontAwesomeIcon)
.use(i18n)
.use(primeVue, { ripple: true })
.use(ConfirmationService)
.use(ToastService)
.mount('#app');

