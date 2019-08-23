/* eslint-disable import/prefer-default-export */
import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap-css-only/css/bootstrap.min.css';
import VueChatScroll from 'vue-chat-scroll';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faSearch, 
  faVideo, 
  faPhone,
  faUserCircle,
  faUsers,
  faPlus,
  faBan,
  faPaperclip,
  faLocationArrow,
  faEllipsisV,
} from '@fortawesome/free-solid-svg-icons'

import { faGooglePlusG } from '@fortawesome/free-brands-svg-icons';

require('jquery');

Vue.config.productionTip = false;

Vue.use(VueChatScroll);

library.add(
  faSearch, 
  faVideo, 
  faPhone,
  faUserCircle,
  faUsers,
  faPlus,
  faBan,
  faPaperclip,
  faLocationArrow,
  faEllipsisV,
  faGooglePlusG
);
Vue.component('font-awesome-icon', FontAwesomeIcon)

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

import VueProgressBar from 'vue-progressbar'

Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '10px'
})

const Swal = require('sweetalert2')
window.Swal = Swal;

const firebaseConfig = {
  apiKey: 'AIzaSyA6Ez3-5dlCLicWYBCRmh55U37YW0U6zqE',
  authDomain: 'chat-app-f412a.firebaseapp.com',
  databaseURL: 'https://chat-app-f412a.firebaseio.com',
  projectId: 'chat-app-f412a',
  storageBucket: '',
  messagingSenderId: '32699626357',
  appId: '1:32699626357:web:9f6c7040e60de8ee',
};
firebase.initializeApp(firebaseConfig);

require('firebase/firestore');

export const db = firebase.firestore();

window.db = db;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
