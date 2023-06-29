import Vue from 'vue';
import App from '@/App.vue';
import store from '@/store/index';
import router from '@/router';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import '@/assets/main.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHouse, faTrash, faPen, faFloppyDisk, faXmark, faTag, faUser, faGear, faPlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import i18n from '@/i18n';
import formatter from '@/mixins/formatter';
import authActions from '@/mixins/authActions';
import "vue2-datepicker/index.css";
import 'vue2-datepicker/locale/ru';
import '@/assets/datepicker.scss';
import './registerServiceWorker';
import ApiService from "@/services/ApiService";
import Moment from 'moment';
import './registerServiceWorker';
Moment.locale('ru');
Vue.prototype.$moment = Moment;
//temporary service DB

library.add(faHouse, faTrash, faPen, faFloppyDisk, faXmark, faTag, faUser, faGear, faPlus, faArrowLeft);
Vue.component('font-awesome-icon', FontAwesomeIcon);

const token = localStorage.getItem('token');
if (token) {
  ApiService.defaults.headers.common['Authorization'] = token;
}


Vue.config.productionTip = false;
Vue.use(Buefy, {
  defaultIconComponent: 'font-awesome-icon',
  defaultIconPack: 'fas',
});
Vue.mixin(formatter);
Vue.mixin(authActions);


new Vue({
  i18n,
  store,
  router,
  render: h => h(App)
}).$mount('#app');
