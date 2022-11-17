import axios from 'axios'
// 引入进度条
import nProgress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
import store from '@/store/index'
const axio = axios.create({
    baseURL: '/api',
    timeout: 5000
})
axio.interceptors.request.use((config) => {
    nProgress.start()  /* 进度条开始 */
    // if (store.state.detail.uuid_token) {
    //     // 将身份认证信息作为请求头发送给服务器
    //     config.headers.userTempId = store.state.detail.uuid_token
    // }
    if (store.state.LoginAndRegister.token) {
        config.headers.token = store.state.LoginAndRegister.token
    }
    return config
})

axio.interceptors.response.use(
    (res) => {
        nProgress.done()   /* 进度条结束 */
        return res.data
    },
    (err) => {
        alert('未获取数据,请重试')
        return Promise.reject(new Error(err.message))
    })

export default axio