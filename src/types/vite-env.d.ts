/* 让 TS 认识 src 下任意文件夹的默认导出（一劳永逸） */
declare module '@//*' {
    const mod: any
    export default mod
}
/// <reference types="vite/client" />
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

declare module '*.scss' { }
declare module '*.css' { }
declare module '*.less' { }