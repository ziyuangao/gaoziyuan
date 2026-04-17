<template>
    <el-dialog v-model="dialogVisible" width="900px" center :show-close="false">
        <el-row justify="space-between">
            <el-col :span="12">
                <el-form ref="formRef" label-width="100" :model="form" :rules="rules" class="sign-up-form" size="large">
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="form.email" placeholder="请输入邮箱" type="email" />
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="form.password" placeholder="请输入密码" type="password" />
                    </el-form-item>
                    <el-form-item label="确认密码" prop="confirmPassword">
                        <el-input v-model="form.confirmPassword" placeholder="请确认密码" type="password" />
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="12">
                <el-card header="重要提示">
                    <div>账号仅用于留言板，不验证邮箱，不提供密码找回。</div>
                    <div>密码经过加密存储，遗忘请重新注册。</div>
                    <div>我们只审核留言内容是否合法、合规。</div>
                    <div>请勿使用你在其他重要网站的相同密码。</div>
                </el-card>
            </el-col>
        </el-row>
        <template #footer>
            <el-button type="primary" @click="submitForm(formRef)" size="large" :loading="submitLoading"
                :disabled="submitLoading">
                注册
            </el-button>
            <el-button type="primary" @click="handleDialogClose" size="large">
                关闭
            </el-button>
        </template>
    </el-dialog>
</template>

<script setup>
import { reactive, ref, computed } from 'vue';
import { ElMessage } from 'element-plus'
import { registerUser } from '@/api/request';

defineOptions({
    name: 'SignUp'
})

const props = defineProps({
    signVisible: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['close', 'update:signVisible'])

// 提交按钮的 loading 状态
const submitLoading = ref(false)

// 创建一个计算属性来处理对话框的显示状态
const dialogVisible = computed({
    get: () => props.signVisible,
    set: (value) => {
        if (!value) {
            // 当对话框关闭时，触发事件更新父组件的状态
            emit('update:signVisible', value)
            emit('close')
        }
    }
})

const formRef = ref()

const handleDialogClose = () => {
    // 清空表单校验
    formRef.value?.resetFields()
    // 关闭对话框
    dialogVisible.value = false
}

const form = reactive({
    email: "",
    password: "",
    confirmPassword: ""
});

const rules = reactive({
    email: [
        { required: true, message: '请输入邮箱', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱', trigger: ['blur', 'change'] }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
    ],
    confirmPassword: [
        { required: true, message: '请确认密码', trigger: 'blur' },
        {
            validator: (rule, value, callback) => {
                if (value !== form.password) {
                    callback(new Error('两次输入的密码不一致'));
                } else {
                    callback();
                }
            },
            trigger: 'blur'
        }
    ]
})

const submitForm = async (formEl) => {
    if (!formEl) return

    // 防止重复提交：如果已经在提交中，直接返回
    if (submitLoading.value) return

    await formEl.validate((valid) => {
        if (valid) {
            // 开启 loading
            submitLoading.value = true

            // 发送请求
            registerUser({ ...form }).then(res => {
                // 注册成功后关闭对话框
                if (res.success) {
                    ElMessage.success('注册成功')
                    dialogVisible.value = false
                    // 清空表单
                    formEl.resetFields()
                }
            }).catch(err => {
                ElMessage.error(err.response?.data?.error || '注册失败，请稍后重试');
            }).finally(() => {
                // 无论成功还是失败，都要关闭 loading
                submitLoading.value = false
            })
        } else {
            // 使用 Element Plus 的 message
            ElMessage.error('请检查输入信息是否正确');
            return false;
        }
    })
}
</script>

<style scoped>
.sign-up-box {
    z-index: 999;
    position: fixed;
    inset: 0;
    background: rgba(233, 233, 233, 0.8);
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.sign-up-form {
    width: 400px;
    margin: auto;
}

.el-form-item~.el-form-item {
    margin-top: 35px;
}
</style>