import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import '@/mock/mockSever.js'
import 'swiper/css/swiper.css'
import Pagination from './components/Pagination/Pagination.vue'
Vue.config.productionTip = false
// 三级联动注册
import TypeNav from './components//TypeNav/TypeNav.vue'
import * as API from '@/api/index.js'
import load from '@/assets/images/load.jpg'
Vue.component('TypeNav', TypeNav)
Vue.component('Pagination', Pagination)
import VueLazyload from 'vue-lazyload'
import { MessageBox, Form, FormItem, Input, Checkbox } from 'element-ui'
Vue.use(Form); Vue.use(FormItem); Vue.use(Input); Vue.use(Checkbox);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.use(VueLazyload, {
  loading: load,
})
new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$api = API
  }
}).$mount('#app')
