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
            <el-card v-for="msg in messageList" :key="msg.id" class="message-card" shadow="hover">
                <template #header>
                    <div class="card-header">
                        <span class="nickname">{{ msg.nickname }}</span>
                        <span class="time">{{ msg.time }}</span>
                        <el-button type="danger" size="small" link @click="deleteMessage(msg.id)" class="delete-btn">
                            删除
                        </el-button>
                    </div>
                </template>
                <div class="content">{{ msg.content }}</div>
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

const route = useRouter();
// 模拟后端返回的数据结构
const mockData = {
    pageSize: 10,
    pageCount: 3,
    total: 25,
    list: [
        { id: 1, nickname: "A***B", time: "2026-04-16 14:30", content: "这是一条留言内容，欢迎留言！", isDelete: 2 },
        { id: 2, nickname: "C***D", time: "2026-04-16 13:15", content: "Vue3 + Element Plus 真好用！", isDelete: 2 },
        { id: 3, nickname: "E***F", time: "2026-04-16 12:00", content: "半匿名昵称效果不错", isDelete: 2 },
        { id: 4, nickname: "G***H", time: "2026-04-16 10:45", content: "分页组件简洁明了", isDelete: 2 },
        { id: 5, nickname: "I***J", time: "2026-04-15 22:10", content: "管理员可以删除留言", isDelete: 2 },
        { id: 6, nickname: "K***L", time: "2026-04-15 19:30", content: "字数限制200字，避免刷屏", isDelete: 2 },
        { id: 7, nickname: "M***N", time: "2026-04-15 16:20", content: "支持清空输入框", isDelete: 2 },
        { id: 8, nickname: "O***P", time: "2026-04-15 14:00", content: "留言卡片设计清晰", isDelete: 2 },
        { id: 9, nickname: "Q***R", time: "2026-04-15 11:15", content: "分页上一页下一页逻辑正常", isDelete: 2 },
        { id: 10, nickname: "S***T", time: "2026-04-15 09:45", content: "期待后端接口对接", isDelete: 2 },
    ]
}

// 第二页数据（模拟）
const mockDataPage2 = {
    pageSize: 10,
    pageCount: 3,
    total: 25,
    list: [
        { id: 11, nickname: "U***V", time: "2026-04-14 20:30", content: "留言板第二页内容示例1", isDelete: 2 },
        { id: 12, nickname: "W***X", time: "2026-04-14 18:15", content: "留言板第二页内容示例2", isDelete: 2 },
        { id: 13, nickname: "Y***Z", time: "2026-04-14 15:00", content: "留言板第二页内容示例3", isDelete: 2 },
        { id: 14, nickname: "A***C", time: "2026-04-14 12:30", content: "留言板第二页内容示例4", isDelete: 2 },
        { id: 15, nickname: "D***F", time: "2026-04-14 10:10", content: "留言板第二页内容示例5", isDelete: 2 },
        { id: 16, nickname: "G***I", time: "2026-04-13 22:00", content: "留言板第二页内容示例6", isDelete: 2 },
        { id: 17, nickname: "J***L", time: "2026-04-13 19:45", content: "留言板第二页内容示例7", isDelete: 2 },
        { id: 18, nickname: "M***O", time: "2026-04-13 16:30", content: "留言板第二页内容示例8", isDelete: 2 },
        { id: 19, nickname: "P***R", time: "2026-04-13 14:00", content: "留言板第二页内容示例9", isDelete: 2 },
        { id: 20, nickname: "S***U", time: "2026-04-13 11:20", content: "留言板第二页内容示例10", isDelete: 2 },
    ]
}

// 第三页数据（模拟）
const mockDataPage3 = {
    pageSize: 10,
    pageCount: 3,
    total: 25,
    list: [
        { id: 21, nickname: "V***X", time: "2026-04-12 21:30", content: "留言板第三页内容示例1", isDelete: 2 },
        { id: 22, nickname: "Y***A", time: "2026-04-12 18:15", content: "留言板第三页内容示例2", isDelete: 2 },
        { id: 23, nickname: "B***D", time: "2026-04-12 15:00", content: "留言板第三页内容示例3", isDelete: 2 },
        { id: 24, nickname: "E***G", time: "2026-04-12 12:30", content: "留言板第三页内容示例4", isDelete: 2 },
        { id: 25, nickname: "H***J", time: "2026-04-12 10:10", content: "留言板第三页内容示例5", isDelete: 2 },
    ]
}

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
const fetchMessages = (page) => {
    // 模拟异步请求
    return new Promise((resolve) => {
        setTimeout(() => {
            let data
            if (page === 1) {
                data = JSON.parse(JSON.stringify(mockData))
            } else if (page === 2) {
                data = JSON.parse(JSON.stringify(mockDataPage2))
            } else {
                data = JSON.parse(JSON.stringify(mockDataPage3))
            }
            resolve(data)
        }, 300)
    })
}

// 加载当前页数据
const loadMessages = async () => {
    const data = await fetchMessages(currentPage.value)
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
const submitMessage = () => {
    if (!newMessage.value.trim()) return

    // 模拟提交新留言
    const newId = Date.now()
    const now = new Date()
    const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

    // 临时昵称（实际应该从登录用户获取）
    const tempNickname = "访***客"

    const newMsg = {
        id: newId,
        nickname: tempNickname,
        time: timeStr,
        content: newMessage.value,
        isDelete: 2
    }

    // 添加到当前列表最前面（最新留言在上）
    messageList.value.unshift(newMsg)
    total.value++

    // 如果当前页超出限制，简单处理：保持在第一页
    if (messageList.value.length > 10) {
        // 简单模拟分页调整：重新加载第一页数据
        currentPage.value = 1
        loadMessages()
    }

    // 清空输入框
    newMessage.value = ''

    // 提示成功（Element Plus 需要额外引入，这里用 alert 简化）
    alert('留言提交成功！')
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