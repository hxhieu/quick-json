import Vue from 'vue';

// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

import './element-ui';

import App from './App';
import router from './router';
import store from './store';

import VueSplit from 'vue-split-panel';
import 'vue-split-panel/dist/styles/vue-split-panel.css';

Vue.use(VueSplit);

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.config.productionTip = false;

// Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app');
