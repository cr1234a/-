import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import store from '@/store/index.js'
import Trade from '@/pages/Trade/index.vue'
// 重新push方法
const orginpush = VueRouter.prototype.push
VueRouter.prototype.push = function (location, res, err) {
    if (res || err) {
        orginpush.call(this, location, res, err)
    } else {
        orginpush.call(this, location, () => { }, () => { })
    }
}
// 重写replace方法
const orginreplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function (location, res, err) {
    if (res || err) {
        orginreplace.call(this, location, res, err)
    } else {
        orginreplace.call(this, location, () => { }, () => { })
    }
}
const router = new VueRouter({
    mode: 'hash',
    // 路由跳转窗口滚动的位置
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        if (to.meta.scroll) {
            return { y: 0 }
        }
    },
    routes: [
        {
            path: '/center',
            component: () => import('@/pages/Center/index.vue'),
            meta: { scroll: true, isShow: true, isclose: true },
            children: [
                {
                    path: 'userorder',
                    component: () => import('@/pages/Center/userOrder/index.vue'),
                    meta: { isclose: true }
                },
                {
                    path: 'grouporder',
                    component: () => import('@/pages/Center/groupOrder/index.vue'),
                    meta: { isclose: true }

                },
                {
                    path: '/center',
                    redirect: '/center/userorder'
                }
            ]
        },
        {
            path: '/paysuccess',
            component: () => import('@/pages/PaySuccess/index.vue'),
            meta: { scroll: true, isShow: true, isclose: true }
        },
        {
            path: '/pay',
            component: () => import('@/pages/Pay/index.vue'),
            meta: { scroll: true, isShow: true, isclose: true },
            beforeEnter(to, from, next) {
                if (from.path == '/trade') {
                    next()
                } else if (from.path == '/paysuccess') {
                    next('/')
                }
                else {
                    next(false)
                }
            }
        },
        {
            path: '/shopcart',
            component: () => import('@/pages/ShopCart/index.vue'),
            meta: { scroll: true, isShow: true, isclose: true }
        }, {
            path: '/trade',
            component: Trade,
            meta: { scroll: true, isShow: true, isclose: true },
            beforeEnter(to, from, next) {
                if (from.path == '/shopcart') {
                    next()
                } else if (from.path == '/pay') {
                    next(router.go(-1))
                }
                else {
                    next(false)
                }
            }
        },
        {
            path: '/detail/:stuid',
            component: () => import('@/pages/Detail/index.vue'),
            meta: { scroll: true, isShow: true }
        },
        {
            path: '/addcartsuccess',
            name: 'addcartsuccess',
            component: () => import('@/pages/AddCartSuccess/index.vue'),
            meta: { isShow: true, isclose: true },      /* 是否展示底部 */
            beforeEnter(to, from, next) {
                if (from.path.indexOf('/detail') != -1) {
                    next()
                } else if (from.path == '/shopcart') {
                    next(router.go(-1))
                }
                else {
                    next(false)
                }
            }
        },
        {
            path: '/home',
            component: () => import('../pages/Home/index.vue'),
            meta: { isShow: true }      /* 是否展示头部和底部 */
        },
        {
            path: '/login',
            component: () => import('../pages/Login/index.vue')
        },
        {
            name: 'search',
            path: '/search/:keyword?',
            component: () => import('@/pages/Search/index.vue'),
            meta: { isShow: true }
        },
        {
            path: '/register',
            component: () => import('../pages/Register/index.vue')
        },
        // 重定向，在项目跑起来时，访问/(主路径)时跳转到首页
        {
            path: '*',
            redirect: '/home'
        }
    ]
})
router.beforeEach(async (to, from, next) => {
    let token = store.state.LoginAndRegister.token
    let userName = store.state.LoginAndRegister.userName
    if (token) {
        if (to.path == '/login') {
            next('/home')
        } else {
            if (userName) {
                next()
            } else {
                try {
                    await store.dispatch('LoginAndRegister/getUserInfo')
                    next()
                } catch (error) {
                    // token可能有时间限制，导致失效,也有可能token被手动修改了，从而产生错误
                    await store.dispatch('LoginAndRegister/logOut')
                    next('/login')
                }
            }
        }
    } else {
        let toPath = to.path
        // console.log(toPath)
        if (to.meta.isclose) {
            alert('请登录')
            next('/login?redirect=' + toPath)
        } else {
            next()
        }
    }
})
export default router