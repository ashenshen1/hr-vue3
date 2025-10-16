import { defineStore } from 'pinia'
import { ref } from 'vue'
import { login } from '@/api/user'
import { getToken, setToken } from '@/utils/auth'

/** 类型声明 */
export interface loginForm {
    mobile: string
    password: string
    isAgree: boolean
}

/** store 定义 */
export const useUserStore = defineStore('user', () => {
    // state
    const token = ref<string | null>(getToken())

    // action
    async function loginAction(data: loginForm) {
        const resToken = await login(data) // 调api拿token
        setToken(resToken)
        token.value = resToken
    }
    return { token, loginAction }
})