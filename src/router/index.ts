import { createRouter, createWebHistory } from 'vue-router'
/**
 * createRouter造路由器 createWebHistory设历史模式
 * 注：浏览器历史模式是指url无#
 */

import {
    // type RouteRecordRaw,
    type Router
} from 'vue-router'
import { constantRoutes } from '../router/constant' // 常驻路由
// import { asyncRoutes } from '../router/async'     // 权限路由
export const router: Router = createRouter({
    history: createWebHistory(),
    routes: constantRoutes
})



/** 重置动态路由（退出登录时调用） */
export function resetRouter(): void {
    // 1. 拿到当前所有路由
    const routes = router.getRoutes()

    // 2. 只删“动态添加”的（标记 isConstant 的保留）
    routes.forEach(route => {
        if (route.name && !route.meta?.isConstant) {
            router.removeRoute(route.name)
        }
    })
}

// /** 按角色动态添加路由 */
// export function addAsyncRoutes(roles: string[]): void {
//     asyncRoutes.forEach(route => {
//         if (route.meta?.roles?.some(r => roles.includes(r))) {
//             router.addRoute(route)
//         }
//     })
// }

export default router