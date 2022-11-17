// 登录和注册仓库
import { getVerificationCode, register, login, getUserInfo, logout } from '@/api/index.js'
const actions = {
    // 获取验证码
    async getCode(context, phone) {
        let res = await getVerificationCode(phone)
        if (res.code == 200) {
            context.commit('GETVERIFICATIONCODE', res.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('错误'))
        }
    },
    // 注册
    async register({ commit }, data) {
        let res = await register(data)
        if (res.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('错误'))
        }
    },
    // 登录
    async login({ commit }, data) {
        let res = await login(data)
        if (res.code == 200) {
            commit('LOGIN', res.data.token)
            localStorage.setItem('token', res.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('错误'))
        }
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
        let res = await getUserInfo()
        if (res.code == 200) {
            commit('GETUSERNAME', res.data.name)
            return 'ok'
        } else {
            return Promise.reject(new Error('错误'))
        }
    },
    // 退出登录
    async logOut({ commit }) {
        let res = await logout()
        if (res.code == 200) {
            commit('LOGOUT')
            return 'ok'
        } else {
            return Promise.reject(new Error('错误'))
        }
    }

}

const mutations = {
    // 验证码
    GETVERIFICATIONCODE(state, value) {
        state.VerificationCode = value
    },
    // 登录
    LOGIN(state, value) {
        state.token = value
    },
    // 获取用户信息
    GETUSERNAME(state, value) {
        state.userName = value
    },
    // 退出登录
    LOGOUT(state) {
        state.userName = '',
            state.token = ''
        state.VerificationCode = ''
        localStorage.removeItem('token')
    }

}

const state = {
    VerificationCode: '',
    token: localStorage.getItem('token'),
    userName: ''
}

const getters = {}

export default {
    namespaced: true,
    actions,
    mutations,
    state,
    getters
}