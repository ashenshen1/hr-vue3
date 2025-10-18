import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchLoginToken } from '../../api/user'
import { getToken, setToken } from '../../utils/auth'
import { resetRouter, } from '../../router'

/** 类型声明 */
export interface loginForm {
    mobile: string
    password: string
    isAgree: boolean
}

/** store 定义 */
export const useUserStore = defineStore('user', () => {
    // state
    // 创建一个可变且能被 Vue 追踪 的容器 容器里只能放 string 或 null（TypeScript 类型约束）
    const token = ref<string | null>(getToken())

    // function
    function logout() {
        removeToken()
        // setUserInfo({})
        resetRouter() // 把之前动态添加的路由规则全清掉 退出登录/切换角色后 路由访问权限也要变
        // await router.replace('/login')
    }

    function removeToken() {
        token.value = null
        localStorage.removeItem('token')
    }

    // function setUserInfo(userinfo: Record<string, any>) {
    //     userInfo.value = userinfo

    // }
    // action
    async function loginAction(data: loginForm) {
        const resToken = await fetchLoginToken(data) // 调api拿token  别重名
        setToken(resToken)
        token.value = resToken
    }
    return { token, loginAction, logout }

})
