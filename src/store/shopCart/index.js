import { shopcart, deleteCartGoods, switchGoodsState } from '@/api/index.js'
const actions = {
    // 获取购物车信息
    async getShopCart(context) {
        let res = await shopcart()
        if (res.code == 200) {
            context.commit('GETSHOPCART', res.data)
        }
    },
    // 删除购物车商品
    async removeCartGoods(context, skuid) {
        let res = await deleteCartGoods(skuid)
        if (res.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('删除失败，请重试'))
        }
    },
    // 切换商品选中状态
    async switchGoodsState(context, { skuId, isChecked }) {
        let res = await switchGoodsState(skuId, isChecked)
        if (res.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('失败'))
        }
    },
    // 删除选中的全部商品
    removeChooseAllGoods(context, cart) {
        let promiseall = []
        cart.forEach(item => {
            let promise = item.isChecked == 1 ? context.dispatch('removeCartGoods', item.skuId) : ''
            promiseall.push(promise)
        })
        return Promise.all(promiseall)
    },
    // 是否全选
    totalChoose(context, { cart, isChecked }) {
        let promiseall = []
        cart.forEach(item => {
            if (item.isChecked != isChecked)
                var promise = context.dispatch('switchGoodsState', { skuId: item.skuId, isChecked })
            promiseall.push(promise)
        })
        return Promise.all(promiseall)
    }
}

const mutations = {
    GETSHOPCART(state, value) {
        state.shopcart = value
    }
}

const state = {
    shopcart: []
}

const getters = {
    CartInfoList(state) {
        return state.shopcart[0] || {}
    },
    cartInfoList(state) {
        return state.shopcart[0].cartInfoList || []
    }
}

export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
}