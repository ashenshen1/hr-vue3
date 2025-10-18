// src/router/permission.ts
import router from './router'
// import { createRouter, createWebHistory } from 'vue-router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { useUserStore } from './store/modules/user'
// import { asyncRoutes } from './router/async' // 你的动态路由表
// import { constantRoutes } from './router/constant'

// 白名单
const whiteList = ['/login', '/404']

/**
 * 全局前置守卫
 * 路由跳转之前 被拦下来执行的一段逻辑
 * 根据角色动态加路由
 * 安检通过了才能跳转网页 不通过可以拒绝或重定向
 *
 */
router.beforeEach(async (to, from, next) => {
    // to   : 准备去哪条路由
    // from : 从哪条路由过来
    // next : 放行函数，调用它才会继续跳
    nprogress.start()
    const userStore = useUserStore()

    if (userStore.token) {
        // 已登录
        if (to.path === '/login') {
            next('/') // 转到主页
            nprogress.done()
            return
        }

        // // 第一次获取用户资料
        // if (!userStore.userId) {
        //     try {
        //         const { roles } = await userStore.getUserInfo()
        //         // 按角色筛选动态路由
        //         const filterRoutes = asyncRoutes.filter((r) =>
        //             roles.menus.includes(r.name!)
        //         )
        //         // 动态添加到路由表
        //         filterRoutes.forEach((r) => router.addRoute(r))
        //         // 404 兜底
        //         router.addRoute({
        //             path: '/:pathMatch(.*)*',
        //             name: 'NotFound',
        //             component: () => import('@/views/404.vue'),
        //         })
        //         // 确保路由已加载
        //         next(to.fullPath)
        //     } catch (e) {
        //         // 获取资料失败 → 强制退出
        //         await userStore.logout()
        //         next('/login')
        //         nprogress.done()
        //     }
        // } else {
        //     next()
        // }
    } else {
        // 未登录
        if (whiteList.includes(to.path)) {
            next()
        } else {
            next('/login')
            nprogress.done()
        }
    }
})

/**
 * 全局后置守卫
 * 跳转完成后触发，只能做“善后”工作（如关进度条），不能拦截
 */
router.afterEach(() => {
    nprogress.done()
})