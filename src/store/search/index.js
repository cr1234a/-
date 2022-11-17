// search
import { getSearch } from '@/api/index'
const actions = {
    async getSearch(context, value) {
        let res = await getSearch(value)
        if (res.data.code == 200) {
            context.commit('GETSEARCH', res.data.data)
        }
    }
}

const mutations = {
    GETSEARCH(state, value) {
        state.searchList = value
    }
}

const state = {
    searchList: {}
}

const getters = {
    attrsList(state) {
        // 当服务器没有返回数据时，使用[ ]
        return state.searchList.attrsList || []
    },
    goodsList(state) {
        return state.searchList.goodsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    }
}

export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
}