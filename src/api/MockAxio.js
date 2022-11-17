import axios from 'axios'
// 引入进度条
import nProgress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
const axio = axios.create({
    baseURL: '/mock',
    timeout: 5000
})
axio.interceptors.request.use((config) => {
    nProgress.start()  /* 进度条开始 */
    return config
})

axio.interceptors.response.use(
    (res) => {
        nProgress.done()   /* 进度条结束 */
        return res.data
    },
    (err) => {
        return Promise.reject(new Error(err.message))
    })

export default axio