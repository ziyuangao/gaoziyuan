<template>
    <div class="message-board">
        <!-- 顶部栏 -->
        <div class="header">
            <div class="logo">💬 留言板</div>
            <el-button type="primary" @click="handleLogin">登录</el-button>
        </div>

        <!-- 留言输入区 -->
        <div class="input-area">
            <el-input v-model="newMessage" type="textarea" :rows="4" maxlength="200" show-word-limit
                placeholder="说点什么吧...（最多200字）" @blur="handleInputBlur" clearabled />
            <div class="input-actions">
                <el-button type="primary" @click="submitMessage" :disabled="!newMessage.trim()">
                    提交
                </el-button>
            </div>
        </div>

        <!-- 统计+分页信息栏 -->
        <div class="info-bar">
            <span>共 {{ total }} 条留言</span>
            <span>第 {{ currentPage }} / {{ pageCount }} 页</span>
        </div>

        <!-- 留言列表 -->
        <div class="message-list">
            <el-card v-for="msg in messageList" :key="msg._id" class="message-card" shadow="hover">
                <template #header>
                    <div class="card-header">
                        <span class="nickname">{{ msg.nickname }}</span>
                        <span class="time">{{ msg.timestamp }}</span>
                        <el-button type="danger" size="small" link @click="deleteMessage(msg._id)" class="delete-btn">
                            删除
                        </el-button>
                    </div>
                </template>
                <div class="content">{{ msg.message }}</div>
            </el-card>
        </div>

        <!-- 分页控件 -->
        <div class="pagination-wrapper">
            <el-button @click="prevPage" :disabled="currentPage <= 1">
                上一页
            </el-button>
            <el-button @click="nextPage" :disabled="currentPage >= pageCount">
                下一页
            </el-button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { addmsg, getmsglist } from '@/api/request'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const route = useRouter();

// 当前页数据
const currentPage = ref(1)
const messageList = ref([])
const total = ref(0)
const pageCount = ref(0)

// 新留言内容
const newMessage = ref('')

const handleInputBlur = () => {
    // 当前用户是否登录
    const isLogin = sessionStorage.getItem('token') ? true : false
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
        const reqResult = await getmsglist({ pageCount: page, pageSize: 10 });
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
    const data = await fetchMessages(currentPage.value)
    // 未获取数据
    if (!data.list) {
        return
    }
    messageList.value = data.list
    total.value = data.total
    pageCount.value = data.pageCount
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
    if (currentPage.value > 1) {
        currentPage.value--
        loadMessages()
        // 滚动到顶部
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
}

// 下一页
const nextPage = () => {
    if (currentPage.value < pageCount.value) {
        currentPage.value++
        loadMessages()
        // 滚动到顶部
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
}

// 提交留言
const submitMessage = async () => {
    if (!newMessage.value.trim()) return

    const newMsg = {
        userId: userStore.USER_INFO.userId,
        nickname: userStore.USER_INFO.email,
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
            loadMessages()
        } else {
            // 留言失败
            ElMessage.error(reqResult.message)
        }

    } catch (error) {
        console.log(error, 'error')
    }
    return
}


// 删除留言
const deleteMessage = (id) => {
    // 模拟删除
    const index = messageList.value.findIndex(msg => msg.id === id)
    if (index !== -1) {
        messageList.value.splice(index, 1)
        total.value--

        // 如果当前页没有数据且不是第一页，回到上一页
        if (messageList.value.length === 0 && currentPage.value > 1) {
            currentPage.value--
            loadMessages()
        }

        alert('留言已删除')
    }
}

// 登录按钮点击（跳转到你的登录页）
const handleLogin = () => {
    route.push('/login')
}

// 初始化加载数据
onMounted(() => {
    loadMessages()
    checkedPendingMessage()
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