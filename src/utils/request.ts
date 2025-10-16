import type {
    AxiosInstance,
    AxiosResponse,
    AxiosError,
    InternalAxiosRequestConfig
} from 'axios'


import axios from 'axios'
import { useUserStore } from '@/stores/user'   // Pinia 仓库
import { ElMessage } from 'element-plus'
import router from '@/router'
