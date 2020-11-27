import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueRouter from 'vue-router'
import Routes from './routes'
import VueResource from "vue-resource"
import { store } from './store/store'
import VueCardFormat from 'vue-credit-card-validation';
import firebase from 'firebase/app';
import auth from 'firebase/auth';        // for authentication
import storage  from 'firebase/storage';     // for storage
import db from 'firebase/database';    // for realtime database
import firestore from'firebase/firestore';   // for cloud firestore
import messaging from 'firebase/messaging';   // for cloud messaging
import functions from 'firebase/functions';   // for cloud functions
import analytics from 'firebase/analytics'
 
Vue.use(VueCardFormat);
export { firebase, auth, storage, functions, firestore, messaging, db, analytics };
 
// Install BootstrapVue
Vue.use(BootstrapVue)
Vue.use(VueRouter)
Vue.use(VueResource);

//------ search event bus
export const bus= new Vue();
export const busCart= new Vue();
export const busWish = new Vue();
export const buslogin = new Vue();
export const busAdd = new Vue();

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
})

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-vWdMt4x_Gumqr0YMSpJ-7B_wyhLmmxA",
  authDomain: "electrnoic-x.firebaseapp.com",
  databaseURL: "https://electrnoic-x.firebaseio.com",
  projectId: "electrnoic-x",
  storageBucket: "electrnoic-x.appspot.com",
  messagingSenderId: "17790905077",
  appId: "1:17790905077:web:6683649321b670bc9033bc",
  measurementId: "G-TP7LZLVJ15"
};
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
 firebase.analytics();
 Vue.prototype.$firebase = firebase;
 
 Vue.config.productionTip = false

new Vue({
  store: store,
  render: h => h(App),
  router: router,
}).$mount('#app')
