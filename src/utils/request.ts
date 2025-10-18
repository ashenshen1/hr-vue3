// request.ts  axios封装
import axios from 'axios'
import HttpInstance from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '../store/modules/user'
import router from '../router'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'


interface HttpInstance extends AxiosInstance {
    <T = any>(config: AxiosRequestConfig): Promise<T>
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>
    // …其余方法
}

const service = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,
    timeout: 10000
}) as HttpInstance

// 3. 请求拦截器（Bearer Token）
// config 是 axios 在发请求前自动创建并传给拦截器的参数
// config是请求配置对象，官方类型明确写了headers字段
service.interceptors.request.use(config => {
    const token = useUserStore().token
    if (token) {
        config.headers = config.headers || {}
        // 把本地存好的token塞进HTTP标准头Authorization 格式固定为Bearer <token>
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, err => Promise.reject(err))

// service.interceptors.response.use(
//     res => res.data,
//     async err => {
//         if (err.response?.status === 401) {
//             ElMessage.warning('登录已过期')
//             await useUserStore().logout()
//             router.replace('/login')
//         }
//         ElMessage.error(err.message || '网络异常')
//         return Promise.reject(err)
//     }
// )

// 后端统一返回格式
interface BaseResponse<T = any> {
    success: boolean
    message: string
    data: T
}
service.interceptors.response.use(
    (response) => {
        // 1. Blob 直接过（下载、导出场景）
        if (response.data instanceof Blob) return response.data

        // 2. 业务 JSON 脱壳
        const { success, message, data } = response.data as BaseResponse
        if (success) return data // 只把 data 抛给业务层

        // 3. 业务失败统一弹窗
        ElMessage({ type: 'error', message })
        return Promise.reject(new Error(message))
    },

    async (error) => {
        // 4. 401  token 超时
        if (error.response?.status === 401) {
            ElMessage({ type: 'warning', message: '登录已过期' })
            await useUserStore().logout() // Pinia 退出
            router.replace('/login')      // 跳登录页
            return Promise.reject(error)
        }

        // 5. 其他网络错误
        ElMessage({ type: 'error', message: error.message || '网络异常' })
        return Promise.reject(error)
    }
)

// / 在 request.ts 末尾加一行模块扩充
declare module 'axios' {
    export interface AxiosResponse<T = any> {
        data: T // 让 TS 知道“data”就是泛型 T
    }
}
export default service