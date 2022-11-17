// 统一管理接口
import axios from 'axios'
import axio from './axios.js'
import MockAxio from './MockAxio.js'
// 三级联动请求
export const goodslinkage = () => {
    return axio({
        method: 'get',
        url: '/product/getBaseCategoryList'
    })
}
// 获取轮播图数据
export const getBanner = () => {
    return MockAxio({
        method: 'get',
        url: '/banner'
    })
}

// 获取楼层数据
export const getFloor = () => {
    return MockAxio({
        method: 'get',
        url: '/floor'
    })
}

// 获取搜索模块数据
export const getSearch = (value) => {
    return axios({
        method: 'post',
        url: '/api/list',
        data: value
    })
}

// 获取商品详情页数据
export const getGoodsDetail = (skuId) => {
    return axio({
        method: 'get',
        url: `/item/${skuId}`,
    })
}
// 添加到购物车
export const addGoodsToCart = (skuID, skuNum) => {
    return axio({
        method: 'post',
        url: `/cart/addToCart/${skuID}/${skuNum}`
    })
}

// 获取购物车信息
export const shopcart = () => {
    return axio({
        method: 'get',
        url: '/cart/cartList'
    })
}
// 删除购物车商品
export const deleteCartGoods = (skuid) => {
    return axio({
        method: 'delete',
        url: `/cart/deleteCart/${skuid}`
    })
}
// 切换商品选中状态
export const switchGoodsState = (skuId, isChecked) => {
    return axio({
        method: 'get',
        url: `/cart/checkCart/${skuId}/${isChecked}`
    })
}

// 获取验证码
export const getVerificationCode = (phone) => {
    return axio({
        method: 'get',
        url: `/user/passport/sendCode/${phone}`
    })
}

// 注册
export const register = (data) => {
    return axio({
        method: 'post',
        url: '/user/passport/register',
        data
    })
}

// 登录
export const login = (data) => {
    return axio({
        method: 'post',
        url: '/user/passport/login',
        data
    })
}

// 获取用户的信息
export const getUserInfo = () => {
    return axio({
        method: 'get',
        url: '/user/passport/auth/getUserInfo'
    })
}

// 退出登录
export const logout = () => {
    return axio({
        method: 'get',
        url: '/user/passport/logout'
    })
}

// 获取用户地址信息
export const getUserAddress = () => {
    return axio({
        method: 'get',
        url: '/user/userAddress/auth/findUserAddressList'
    })
}

// 获取订单交易信息
export const getOrdersInfo = () => {
    return axio({
        method: "get",
        url: '/order/auth/trade'
    })
}

// 提交订单
export const submitOrders = (traderNo, data) => {
    return axio({
        method: 'post',
        url: `/order/auth/submitOrder?tradeNo=${traderNo}`,
        data
    })
}

// 获取订单支付信息 /payment/weixin/createNative/{orderId}
export const getPayInfo = (orderId) => {
    return axio({
        method: 'get',
        url: `/payment/weixin/createNative/${orderId}`
    })
}

// 获取订单支付状态
export const getPayState = (orderId) => {
    return axio({
        method: 'get',
        url: `/payment/weixin/queryPayStatus/${orderId}`
    })
}

// 获取我的订单列表
export const getMyOrderList = (page, limit) => {
    return axio({
        method: "get",
        url: `/order/auth/${page}/${limit}`
    })
}