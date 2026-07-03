<template>
    <div class="message-board">
        <!-- 顶部栏 -->
        <div class="header">
            <div class="logo">💬 留言板</div>
            <el-button v-if="!isLoggedIn" type="primary" @click="handleLogin">登录</el-button>
        </div>

        <!-- 留言输入区 -->
        <div class="input-area">
            <el-input v-model="newMessage" type="textarea" :rows="4" maxlength="200" show-word-limit
                placeholder="说点什么吧...（最多200字）" @blur="handleInputBlur" clearable />
            <div class="input-actions">
                <el-button type="primary" @click="submitMessage" :disabled="!newMessage.trim() || submitLoading">
                    {{ submitLoading ? '提交中...' : '提交' }}
                </el-button>
            </div>
        </div>

        <!-- 统计+分页信息栏 -->
        <div class="info-bar">
            <span>共 {{ total }} 条留言</span>
            <span>第 {{ currentPage }} / {{ pageCount }} 页</span>
        </div>

        <!-- 留言列表 -->
        <div v-loading="listLoading" class="message-list">
            <el-card v-for="msg in messageList" :key="msg._id" class="message-card" shadow="hover">
                <template #header>
                    <div class="card-header">
                        <span class="nickname">{{ msg.nickname }}</span>
                        <span class="time">{{ msg.timestamp }}</span>
                        <el-button v-if="canShowDeleteBtn" type="danger" size="small" link
                            @click="deleteMessage(msg._id)" :disabled="listLoading || submitLoading" class="delete-btn">
                            删除
                        </el-button>
                    </div>
                </template>
                <div class="content">{{ msg.message }}</div>
            </el-card>
        </div>

        <!-- 分页控件 -->
        <div class="pagination-wrapper">
            <el-button @click="prevPage" :disabled="currentPage <= 1 || listLoading">
                上一页
            </el-button>
            <el-button @click="nextPage" :disabled="currentPage >= pageCount || listLoading">
                下一页
            </el-button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { addmsg, getmsglist, deletemsg } from '@/api/request'
import { ElMessage, ElLoading, ElMessageBox } from 'element-plus'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const route = useRouter();
const ADMIN_EMAIL = 'ziyuan_gao@163.com'

// 当前页数据
const currentPage = ref(1)
const messageList = ref([])
const total = ref(0)
const pageCount = ref(0)
const userToken = ref('')

// 新留言内容
const newMessage = ref('')

const isLoggedIn = computed(() => {
    return !!userToken.value
})

const canShowDeleteBtn = computed(() => {
    const email = (userStore.USER_INFO?.email || '').trim().toLowerCase()
    return email === ADMIN_EMAIL
})

// Loading 状态
const submitLoading = ref(false)  // 提交留言的loading
const listLoading = ref(false)    // 获取留言列表的loading

const syncUserToken = () => {
    userToken.value = sessionStorage.getItem('user_token') || ''
}

const handleInputBlur = () => {
    // 当前用户是否登录
    const isLogin = sessionStorage.getItem('user_token') ? true : false
    if (!isLogin) {
        // 未登录时 需要在sessionStorage中保存用户输入的留言内容，以便登录后可以继续发布
        if (newMessage.value.trim() === '') {
            return
        } else {
            sessionStorage.setItem('pendingMessage', newMessage.value)
        }
    }
}

// 根据页码获取数据（模拟接口请求）
const fetchMessages = async (page = 1) => {
    try {
        // 不传递参数就是从第一页加载，否则加载具体页码内容
        const reqResult = await getmsglist({ currentPage: page, pageSize: 10 });
        if (reqResult.success) {
            return reqResult.data;
        } else {
            ElMessage.error(reqResult.message)
            return {}
        }
    } catch (error) {
        console.log(error, 'error')
        return {}
    }

}

// 加载当前页数据
const loadMessages = async () => {
    // 开始加载数据
    listLoading.value = true

    try {
        const data = await fetchMessages(currentPage.value)
        // 未获取数据
        if (!data.list) {
            return
        }
        messageList.value = data.list
        total.value = data.total
        pageCount.value = data.pageCount
    } catch (error) {
        console.error('加载留言失败:', error)
        ElMessage.error('加载留言失败')
    } finally {
        // 无论成功还是失败，都关闭loading
        listLoading.value = false
    }
}

// 加载留言区信息
const checkedPendingMessage = () => {
    const pendingMsg = sessionStorage.getItem('pendingMessage')
    if (pendingMsg) {
        newMessage.value = pendingMsg
        sessionStorage.removeItem('pendingMessage')
    }
}

// 上一页
const prevPage = () => {
    if (currentPage.value > 1 && !listLoading.value) {
        currentPage.value--
        loadMessages()
        // 滚动到顶部
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
}

// 下一页
const nextPage = () => {
    if (currentPage.value < pageCount.value && !listLoading.value) {
        currentPage.value++
        loadMessages()
        // 滚动到顶部
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
}

// 提交留言
const submitMessage = async () => {
    if (!newMessage.value.trim()) return

    syncUserToken()
    if (!userToken.value) {
        ElMessage.warning('请先登录')
        handleLogin()
        return
    }

    // 开始提交，显示loading
    submitLoading.value = true

    const newMsg = {
        message: newMessage.value,
    }

    try {
        const reqResult = await addmsg(newMsg)
        console.log(reqResult, 'reqResult')
        // 留言成功
        if (reqResult.success) {
            ElMessage.success(reqResult.message)
            // 清空输入框
            newMessage.value = ''
            // 重新加载数据
            await loadMessages()
        } else {
            // 留言失败
            ElMessage.error(reqResult.message)
        }
    } catch (error) {
        console.log(error, 'error')
        ElMessage.error('提交失败，请稍后重试')
    } finally {
        // 无论成功还是失败，都关闭loading
        submitLoading.value = false
    }
}


// 删除留言
const deleteMessage = async (id) => {
    try {
        await ElMessageBox.confirm('确认删除这条留言吗？删除后将无法在留言板中看到。', '删除确认', {
            confirmButtonText: '确认删除',
            cancelButtonText: '取消',
            type: 'warning'
        })
    } catch {
        return
    }

    const loadingInstance = ElLoading.service({
        lock: true,
        text: '删除中...',
        background: 'rgba(255, 255, 255, 0.7)'
    })

    try {
        const reqResult = await deletemsg({ id })

        if (reqResult.success) {
            if (messageList.value.length === 1 && currentPage.value > 1) {
                currentPage.value--
            }

            ElMessage.success(reqResult.message || '删除成功')
            await loadMessages()
        } else {
            ElMessage.error(reqResult.message || '删除失败')
        }
    } catch (error) {
        console.error('删除失败:', error)
        const errMsg = error?.response?.data?.message || '删除失败，请稍后重试'
        ElMessage.error(errMsg)
    } finally {
        loadingInstance.close()
    }
}

// 登录按钮点击（跳转到你的登录页）
const handleLogin = () => {
    route.push('/login')
}

// 初始化加载数据
onMounted(() => {
    syncUserToken()
    loadMessages()
    checkedPendingMessage()
    window.addEventListener('focus', syncUserToken)
})
</script>

<style scoped>
.message-board {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding-bottom: 15px;
    border-bottom: 1px solid #e4e7ed;
}

.logo {
    font-size: 24px;
    font-weight: 600;
    color: #409eff;
}

.input-area {
    margin-bottom: 20px;
}

.input-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 10px;
}

.info-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    padding: 0 5px;
    font-size: 14px;
    color: #606266;
}

.message-list {
    margin-bottom: 20px;
    min-height: 300px;
}

.message-card {
    margin-bottom: 15px;
}

.card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
}

.nickname {
    font-weight: 600;
    color: #409eff;
    font-size: 14px;
}

.time {
    font-size: 12px;
    color: #909399;
}

.delete-btn {
    margin-left: auto;
}

.content {
    font-size: 14px;
    line-height: 1.6;
    color: #2c3e50;
    word-break: break-word;
    white-space: pre-wrap;
}

.pagination-wrapper {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-top: 20px;
    padding: 15px 0;
}

/* 响应式调整 */
@media (max-width: 600px) {
    .message-board {
        padding: 12px;
    }

    .card-header {
        gap: 8px;
    }

    .delete-btn {
        margin-left: 0;
    }
}
</style>