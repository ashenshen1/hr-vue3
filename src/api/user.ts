import request from '@/utils/request'

// 登录参数类型
export interface loginForm {
    mobile: string
    password: string
    isAgree: boolean
}

// 登录接口
export async function login(data: loginForm): Promise<string> {
    const res = await request<{ token: string }>({
        url: '/sys/login', // 乱写的
        method: 'post',
        data
    })
    return res.token
}