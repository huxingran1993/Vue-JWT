import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {ValidationProvider, ValidationObserver, extend} from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import BootstrapVue from "bootstrap-vue";
import Vuex from 'vuex'
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {
    faHome,
    faUser,
    faUserPlus,
    faSignInAlt,
    faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";

library.add(faHome, faUser, faUserPlus, faSignInAlt, faSignOutAlt)
// install rules
Object.keys(rules).forEach(rule => {
    extend(rule, rules[rule]);
});
Vue.use(BootstrapVue)
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(Vuex)

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
