// src/router/types.ts
export interface RouteMeta {
    title?: string
    icon?: string
    roles?: string[]
    breadcrumb?: boolean
    activeMenu?: string
    isConstant?: boolean   // 标记常驻路由
}