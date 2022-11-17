import { getUserAddress, getOrdersInfo } from '@/api/index.js'
const actions = {
    // 获取用户地址信息
    async getUserAddressInfo({ commit }) {
        let res = await getUserAddress()
        if (res.code == 200) {
            commit('GETUSERADDRESSINFO', res.data)
        } else {
            alert('获取信息失败，请重试')
        }
    },
    // 获取订单交易页信息
    async getOrdersInfo(context) {
        let res = await getOrdersInfo()
        if (res.code == 200) {
            context.commit('GETORDERSINFO', res.data)
        }
    }
}

const mutations = {
    // 获取用户地址信息
    GETUSERADDRESSINFO(state, value) {
        state.userAddress = value
    },
    GETORDERSINFO(state, value) {
        state.ordersInfo = value
    }
}

const state = {
    userAddress: [],
    ordersInfo: {}
}

const getters = {}

export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
}