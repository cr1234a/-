// home
import { goodslinkage, getBanner, getFloor } from '@/api/index.js'
const actions = {
    // 三级联动
    async goodsclassify(context) {
        let res = await goodslinkage()
        if (res.code == 200) context.commit('GOODSCLASSIFY', res.data)
    },
    // 轮播图
    async getBanner(context) {
        let res = await getBanner()
        if (res.code === 200) {
            context.commit('GETBANNER', res.data)
        }
    },
    // 楼层
    async floorList(context) {
        let res = await getFloor()
        if (res.code == 200) {
            context.commit('FLOOR', res.data)
        }
    }
}

const mutations = {
    // 三级联动
    GOODSCLASSIFY(state, value) {
        state.goodsclassify = value
    },
    GETBANNER(state, value) {
        state.banner = value
    },
    FLOOR(state, value) {
        state.floorList = value
    }
}

const state = {
    goodsclassify: [],
    banner: [],
    floorList: []
}

const getters = {}

export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
}