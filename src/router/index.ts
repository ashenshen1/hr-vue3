import { createRouter, createWebHistory } from 'vue-router'
/**
 * createRouter造路由器 createWebHistory设历史模式
 * 注：浏览器历史模式是指url无#
 */

const routes = [{
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
},
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})
export default router