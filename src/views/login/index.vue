
<template>
    <div class="login-container">
        <div class="logo" />
        <div class="form">
            <h1>登录</h1>
            <el-card shadow="never" class="login-card">
                <!--登录表单-->
                <!-- el-form > el-form-item > el-input -->
                <el-form ref="form" :model="loginForm" :rules="loginRules">
                    <el-form-item prop="mobile">
                        <el-input placeholder="请输入手机号" />
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input show-password placeholder="请输入密码" />
                    </el-form-item>
                    <el-form-item prop="isAgree">
                        <el-checkbox>
                            用户平台使用协议
                        </el-checkbox>
                    </el-form-item>
                    <el-form-item>
                        <el-button style="width: 350px" type="primary" @click="login">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
    </div>
</template>

<script setup lang="ts">
// 导入函数
import { reactive, ref } from 'vue';
// import { useRouter } from 'vue-router';
import { useUserStore } from '../../store/modules/user'
// 导入类型声明
import type { FormInstance } from 'element-plus';


// 响应式数据
const form = ref<FormInstance>() // 声明一个响应式引用 以便后续调用表单方法 比如.validate()/.resetFields()
const isDev = import.meta.env.DEV
const loginForm = reactive({
    mobile: isDev ? '13800000002' : '',
    password: isDev ? '123456' : '',
    isAgree: isDev
})

const userStore = useUserStore()
// const router = useRouter()

// 校验规则
const loginRules = reactive({
    mobile: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 16, message: '密码长度应该为6-16位之间', trigger: 'blur' }
    ],
    isAgree: [
        {
            validator: (_: any, value: boolean, callback: (e?: Error) => void) =>
                value ? callback() : callback(new Error('您必须勾选用户的使用协议'))
        }
    ]
})
// 登录
const login = async () => {
    const passed = form.value?.validate();
    if (passed) {
        await userStore.loginAction(loginForm) // 调用store里的普通方法 此方法用于调用api获取token 并且修改state中的数据
    }

}
</script>

<style scoped lang="scss">
.login-container {
    display: flex;
    align-items: stretch; // 默认的，可以省略
    height: 100vh;
}

.login-container .logo {
    flex: 3;
    background-color: rgba(38, 72, 176);
    background-image: url(@/assets/common/login_back.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover; //背景图铺满+深蓝底  居中铺满不重复
    border-top-right-radius: 60px; //  右上角圆弧60px
    display: flex;
    flex-direction: column; // 子元素（标题、副标题等）垂直排列
    align-items: flex-end; // 文字或图标会贴着右侧边缘
    justify-content: center; // 不管视口多高，文字块永远垂直居中
    padding: 0 100px; //左右各留 100 px 呼吸空间，避免文字贴边 配合 align-items: flex-end 后，文字实际离右边界 100 px
}

.login-container .form {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 176px;
}

.login-container .form .el-card {
    border: none;
    padding: 0;
}

.login-container .form h1 {
    padding-left: 20px;
    font-size: 24px;
}

.login-container .form .el-input {
    width: 350px;
    height: 44px;

    .el-input__inner {
        background: #f4f5fb;
    }
}

.login-container .form .el-checkbox {
    color: #606266;
}
</style>