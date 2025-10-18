import service from '../utils/request'

// 登录参数类型
export interface loginForm {
    mobile: string
    password: string
    isAgree: boolean
}

// api/user.ts
export async function fetchLoginToken(data: loginForm): Promise<string> {
    // post请求 并且告诉typescript 响应脱壳后一定是 {token:string}形状
    const { token } = await service.post<{ token: string }>('/sys/login', data)  // 这里后端接口乱写的 data是请求体
    return token
}
