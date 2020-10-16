import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import store from "./store";

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyAT9_YITkEdJgJIeVjP_Fd1JsVUvu2O8mw",
  authDomain: "hackaton-67fde.firebaseapp.com",
  databaseURL: "https://hackaton-67fde.firebaseio.com",
  projectId: "hackaton-67fde",
  storageBucket: "hackaton-67fde.appspot.com",
  messagingSenderId: "964306146163",
  appId: "1:964306146163:web:9a992763f86edd30096b06",
  measurementId: "G-GVN1290TGJ"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    store.email = user.email
  } else {
    // console.log(this.email)
  }
});
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
