import { getGoodsDetail, addGoodsToCart } from '@/api/index.js'
import { getuuidToken } from '@/pages/utils/uuid_token'
const actions = {
    // 获取商品详情数据
    async getGoodsdetail(context, value) {
        let res = await getGoodsDetail(value)
        if (res.code == 200) {
            context.commit('GETGOODSDETAIL', res.data)
        }
    },
    // 添加到购物车
    async addGoodsToCart(context, { stuId, stuNum }) {
        let res = await addGoodsToCart(stuId, stuNum)
        if (res.code == 200) {
            return '成功'
        } else {
            return Promise.reject(new Error(res.message))
        }
    }
}

const mutations = {
    GETGOODSDETAIL(state, value) {
        state.goodInfo = value
    }
}

const state = {
    goodInfo: {},
    // uuid_token: getuuidToken()
}

const getters = {
    categoryView(state) {
        // 当服务器还没有回来时，goodInfo是一个空对象，这时要保证state.goodInfo.categoryView为一个对象，不然就是undefined会报错
        return state.goodInfo.categoryView || {}
    },
    skuInfo(state) {
        return state.goodInfo.skuInfo || {}
    }
}

export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
}