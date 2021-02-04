import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {http} from './assets/js/http.js'
import VueCookies from 'vue-cookies'

import 'lib-flexible'
// import Vconsole from 'vconsole';
import { RadioGroup, Radio, Button, Field, Uploader, Form, NavBar,Toast,PullRefresh ,List,Dialog,ActionSheet,Picker,Popup,Loading } from 'vant';
Vue.use(RadioGroup).use(Radio).use(Button).use(Field).use(Uploader).use(Form).use(NavBar).use(Toast).use(PullRefresh).use(List).use(Dialog).use(ActionSheet ).use(Picker).use(Popup).use(Loading )
Vue.config.productionTip = false
Vue.prototype.$http = http;
Vue.prototype.$cookies = VueCookies;
// Vue.use(VueCookies)

// new Vconsole()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
