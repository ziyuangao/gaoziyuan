<!-- /**
 * This component is based on code from [animated-characters-login-page]
 * Original repository: https://github.com/a97242689/animated-characters-login-page
 * Original author: [a97242689]
 * License: MIT
 * 如涉及版权问题，请联系 ziyuan_gao@163.com 处理
 */ -->

<template>
    <div class="login-page">
        <!-- Left Content Section with Animated Characters -->
        <div class="left-section">
            <!-- 左侧四个可爱角色 -->
            <div class="characters-section">
                <AnimatedCharacters :isTyping="isTyping" :showPassword="showPassword" :passwordLength="password.length"
                    :loginFailed="loginFailed" :loginSuccess="loginSuccess" />
            </div>

            <!-- 装饰元素 -->
            <div class="grid-overlay"></div>
            <div class="blur-circle blur-circle-1"></div>
            <div class="blur-circle blur-circle-2"></div>
        </div>

        <!-- Right Login Section -->
        <div class="right-section">
            <div class="form-wrapper">
                <!-- Header -->
                <div class="form-header">
                    <h1 class="form-title">欢迎回来~</h1>
                    <p class="form-subtitle">请输入您的登录信息</p>
                </div>

                <!-- Login Form -->
                <form @submit.prevent="handleSubmit" class="login-form">
                    <!-- Email Field -->
                    <div class="form-group">
                        <label for="email" class="form-label">邮箱</label>
                        <input id="email" v-model="email" type="email" placeholder="you@example.com" class="form-input"
                            autocomplete="off" required @focus="isTyping = true" @blur="isTyping = false" />
                        <p v-if="errors.email" class="error-message">{{ errors.email }}</p>
                    </div>

                    <!-- Password Field -->
                    <div class="form-group">
                        <label for="password" class="form-label">密码</label>
                        <div class="password-wrapper">
                            <input id="password" v-model="password" :type="showPassword ? 'text' : 'password'"
                                placeholder="••••••••" class="form-input" required />
                            <button type="button" @click="showPassword = !showPassword" class="password-toggle">
                                <svg v-if="showPassword" class="icon" xmlns="http://www.w3.org/2000/svg" width="20"
                                    height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                                <svg v-else class="icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                    viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                    <path
                                        d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                                    <line x1="2" x2="22" y1="2" y2="22" />
                                </svg>
                            </button>
                        </div>
                        <p v-if="errors.password" class="error-message">{{ errors.password }}</p>
                    </div>

                    <!-- Error Alert -->
                    <div v-if="errorMessage" class="error-alert">
                        {{ errorMessage }}
                    </div>

                    <!-- Submit Button -->
                    <button type="submit" class="submit-button" :disabled="isLoading">
                        <span class="button-text">{{ isLoading ? '登陆中...' : '登录' }}</span>
                        <svg class="button-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round">
                            <path d="M5 12h14" />
                            <path d="m12 5 7 7-7 7" />
                        </svg>
                    </button>
                </form>

                <!-- Sign Up Link -->
                <div class="signup-link">
                    还没有账号? <a @click="signVisible = true">注册</a>
                </div>
            </div>
        </div>
    </div>
    <Signup :signVisible="signVisible" @close="changeSignVisible" />
</template>

<script setup>
import { ref } from 'vue'
import AnimatedCharacters from './AnimatedCharacters.vue'
import Signup from '../sign_up/index.vue'
import { loginUser } from '@/api/request'
import { useUserStore } from '@/stores/userStore'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
defineOptions({
    name: 'LoginPage'
})
const router = useRouter()
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const isTyping = ref(false)
const isLoading = ref(false)
const loginFailed = ref(false)
const loginSuccess = ref(false)
const errorMessage = ref('')
const errors = ref({
    email: '',
    password: ''
})
const userStore = useUserStore()
const signVisible = ref(false)

const validateForm = () => {
    errors.value = { email: '', password: '' }
    let isValid = true

    // 缓存正则表达式，避免每次都创建
    if (!email.value) {
        errors.value.email = 'Email is required'
        isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        errors.value.email = 'Please enter a valid email address'
        isValid = false
    }

    if (!password.value) {
        errors.value.password = 'Password is required'
        isValid = false
    } else if (password.value.length < 6) {
        errors.value.password = 'Password must be at least 6 characters'
        isValid = false
    }

    return isValid
}

const changeSignVisible = () => {
    signVisible.value = false
}

const handleSubmit = async () => {
    if (!validateForm()) return
    // 开始loading状态，重置错误信息和登录状态
    isLoading.value = true
    // 错误信息和登录状态重置
    errorMessage.value = ''
    loginFailed.value = false
    loginSuccess.value = false

    try {
        const loginResult = await loginUser({ email: email.value, password: password.value })
        if (loginResult.success && loginResult.data) {
            loginSuccess.value = true
            // 会话存储保存token请求留言板接口需要使用
            sessionStorage.setItem('user_token', loginResult.data.user_token)
            // 保存用户名 提交留言板接口需要使用
            userStore.SETUSERINFO(loginResult.data.user)
            ElMessage.success({
                message: '登录成功',
                duration: 2000,
                onClose: () => {
                    // 登录成功后关闭对话框
                    router.go(-1)
                }
            })
        }
    } catch (error) {
        errorMessage.value = error.response?.data?.error || '登录失败，请稍后重试'
        loginFailed.value = true
        setTimeout(() => {
            // 登录失败，3秒后重置登录失败状态
            loginFailed.value = false
        }, 3000);
    } finally {
        isLoading.value = false
    }
}

</script>

<style scoped>
.login-page {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 100vh;
    max-height: 100vh;
    overflow: hidden;
}

.left-section {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: linear-gradient(to bottom right, #9ca3af, #6b7280, #4b5563);
    padding: 3rem;
    color: white;
}


.characters-section {
    position: relative;
    z-index: 20;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    height: 700px;
}

.footer-link {
    color: inherit;
    text-decoration: none;
    transition: color 0.2s;
}

.footer-link:hover {
    color: #1f2937;
}

.grid-overlay {
    position: absolute;
    inset: 0;
    background-image:
        linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    background-size: 20px 20px;
}

.blur-circle {
    position: absolute;
    border-radius: 50%;
    filter: blur(96px);
}

.blur-circle-1 {
    top: 25%;
    right: 25%;
    width: 16rem;
    height: 16rem;
    background: rgba(156, 163, 175, 0.2);
}

.blur-circle-2 {
    bottom: 25%;
    left: 25%;
    width: 24rem;
    height: 24rem;
    background: rgba(209, 213, 219, 0.2);
}

.right-section {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background: white;
}

.form-wrapper {
    width: 100%;
    max-width: 420px;
}

.mobile-logo {
    display: none;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 3rem;
}

.form-header {
    text-align: center;
    margin-bottom: 2.5rem;
}

.form-title {
    font-size: 1.875rem;
    font-weight: 700;
    letter-spacing: -0.025em;
    margin-bottom: 0.5rem;
    color: #111827;
}

.form-subtitle {
    font-size: 0.875rem;
    color: #6b7280;
}

.login-form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.form-label {
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
}

.form-input {
    width: 100%;
    height: 3rem;
    padding: 0 1rem;
    background: white;
    border: 1.5px solid rgba(229, 231, 235, 0.6);
    border-radius: 0.5rem;
    font-size: 1rem;
    transition: all 0.2s;
    outline: none;
}

.form-input:focus {
    border-color: #6366f1;
}

.password-wrapper {
    position: relative;
}

.password-wrapper .form-input {
    padding-right: 2.5rem;
}

.password-toggle {
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #9ca3af;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    transition: color 0.2s;
}

.password-toggle:hover {
    color: #111827;
}

.icon {
    width: 20px;
    height: 20px;
}

.error-message {
    font-size: 0.875rem;
    color: #dc2626;
}


.error-alert {
    padding: 0.75rem;
    font-size: 0.875rem;
    color: #dc2626;
    background: rgba(220, 38, 38, 0.1);
    border: 1px solid rgba(220, 38, 38, 0.3);
    border-radius: 0.5rem;
}

.submit-button {
    position: relative;
    width: 100%;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 1rem;
    font-weight: 500;
    border-radius: 0.5rem;
    cursor: pointer;
    overflow: hidden;
    transition: all 0.3s;
}

.submit-button {
    background: #111827;
    color: white;
    border: none;
}

.submit-button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.submit-button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.button-text {
    transition: transform 0.3s;
}

.button-icon {
    width: 20px;
    height: 20px;
    transition: transform 0.3s;
}

.submit-button:hover:not(:disabled) .button-text {
    transform: translateX(-8px);
}

.submit-button:hover:not(:disabled) .button-icon {
    transform: translateX(8px);
}

.signup-link {
    margin-top: 2rem;
    text-align: center;
    font-size: 0.875rem;
    color: #6b7280;
}

.signup-link a {
    color: #111827;
    text-decoration: none;
    font-weight: 500;
    cursor: pointer;
}

.signup-link a:hover {
    text-decoration: underline;
}

@media (max-width: 1024px) {
    .login-page {
        grid-template-columns: 1fr;
    }

    .left-section {
        display: none;
    }

    .mobile-logo {
        display: flex;
    }
}
</style>
