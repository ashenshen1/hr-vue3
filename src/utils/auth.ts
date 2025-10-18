// src/utils/auth.ts
import Cookies from 'js-cookie'

const TokenKey = 'key' as const

export function getToken(): string | null {
    return Cookies.get(TokenKey) ?? null
}

export function setToken(token: string): string | null {
    return Cookies.set(TokenKey, token) ?? null
}

export function removeToken(): void {
    Cookies.remove(TokenKey)
}