import { Store } from 'vuex'
import Vue from 'vue'
import Vuex from 'vuex'
import detail from './Detail/index.js'
import shopCart from './shopCart/index.js'
import LoginAndRegister from './LoginAndRegister/index.js'
import trade from './Trade/index.js'
Vue.use(Vuex)
import home from './home/index.js'
import search from './search/index.js'
export default new Vuex.Store({
    modules: {
        home,
        search,
        detail,
        shopCart,
        LoginAndRegister,
        trade
    }
})