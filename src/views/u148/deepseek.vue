<template>
  <div class="deepseek-chat">
    <!-- 聊天头部 -->
    <div class="chat-header">
      <h2>DeepSeek 聊天助手</h2>
      <el-button type="primary" size="small" @click="startNewChat" :icon="Plus">
        新对话
      </el-button>
    </div>

    <!-- 聊天消息列表 -->
    <div class="chat-messages" ref="messagesContainer">
      <!-- 过滤掉system消息，只显示user和assistant的对话 -->
      <div 
        v-for="(msg, index) in visibleMessages" 
        :key="index" 
        class="message-item"
        :class="msg.role"
      >
        <div class="message-avatar">
          <el-avatar :size="32" :icon="msg.role === 'user' ? User : Avatar" />
        </div>
        <div class="message-content-wrapper">
          <div class="message-sender">
            {{ msg.role === 'user' ? '你' : 'DeepSeek' }}
          </div>
          <div class="message-content" v-html="formatMessage(msg.content)"></div>
        </div>
      </div>
      
      <!-- 加载状态 -->
      <div v-if="isLoading" class="message-item assistant">
        <div class="message-avatar">
          <el-avatar :size="32" :icon="Avatar" />
        </div>
        <div class="message-content-wrapper">
          <div class="message-sender">DeepSeek</div>
          <div class="message-content loading-dots">
            <span></span><span></span><span></span>
          </div>
        </div>
      </div>
    </div>

    <!-- 输入区域 -->
    <div class="chat-input-area">
      <el-input
        v-model="userInput"
        type="textarea"
        :rows="3"
        placeholder="输入你的问题... (Enter发送，Shift+Enter换行)"
        @keydown.enter.prevent="handleKeyDown"
        :disabled="isLoading"
      />
      <div class="input-actions">
        <span class="input-tip">按 Enter 发送，Shift + Enter 换行</span>
        <el-button 
          type="primary" 
          :icon="Search" 
          @click="handleClick"
          :loading="isLoading"
        >
          发送
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from "vue";
import { Search, Plus, User, Avatar } from '@element-plus/icons-vue'
import { talkToDeepseek } from '@/api/request';
import { marked } from 'marked' // 用于渲染markdown
import DOMPurify from 'dompurify' // 用于安全HTML渲染

defineOptions({
    name: 'deepseek-chat'
})

// 状态管理
const userInput = ref('')
const result = ref('')
const messages = ref([
  // 初始化系统消息（不显示在界面上）
  { role: "system", content: "You are a helpful assistant." }
])
const isLoading = ref(false)
const messagesContainer = ref(null)

// 计算属性：过滤出要显示的消息（排除system消息）
const visibleMessages = computed(() => {
  return messages.value.filter(msg => msg.role !== 'system')
})

// 格式化消息内容（支持markdown和代码高亮）
const formatMessage = (content) => {
  if (!content) return ''
  // 使用marked解析markdown，并用DOMPurify净化HTML
  return DOMPurify.sanitize(marked.parse(content))
}

// 处理键盘事件
const handleKeyDown = (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleClick()
  }
  // Shift+Enter 默认换行，不需要额外处理
}

// 开始新对话
const startNewChat = () => {
  messages.value = [
    { role: "system", content: "You are a helpful assistant." }
  ]
  userInput.value = ''
  result.value = '' // 清空原有result显示
}

// 滚动到底部
const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

// 监听消息变化，自动滚动到底部
watch(messages, () => {
  scrollToBottom()
}, { deep: true })

// 发送消息
const handleClick = async () => {
  if (!userInput.value.trim() || isLoading.value) return
  
  const userMessage = userInput.value.trim()
  
  // 添加用户消息到列表
  messages.value.push({
    role: "user",
    content: userMessage
  })
  
  // 清空输入框
  userInput.value = ''
  
  // 滚动到底部
  await scrollToBottom()
  
  // 设置加载状态
  isLoading.value = true
  
  try {
    // 准备发送给后端的消息列表
    // 只发送必要的消息，可以限制消息数量避免token超限
    const messagesToSend = messages.value.slice(-11) // 保留system + 最近5轮对话
    
    // 确保system消息存在
    if (!messagesToSend.some(msg => msg.role === 'system')) {
      messagesToSend.unshift({ role: "system", content: "You are a helpful assistant." })
    }
    
    const params = {
      messages: messagesToSend  // 发送完整的对话历史
    }
    
    console.log('发送参数:', params)
    
    const response = await talkToDeepseek(params)
    if (response.success) {
      // 添加AI回复到消息列表
      messages.value.push({
        role: "assistant",
        content: response.message
      })
      
      // 如果后端返回了完整的对话历史，可以用它来替换（可选）
      if (response.conversation) {
        // 可以选择更新整个对话历史，但要注意保留system消息
        console.log('后端返回的完整对话:', response.conversation)
      }
    } else {
      // 处理错误
      messages.value.push({
        role: "assistant",
        content: `错误：${response.error || '未知错误'}`
      })
    }
  } catch (error) {
    console.error('请求失败:', error)
    messages.value.push({
      role: "assistant",
      content: `请求失败：${error.message}`
    })
  } finally {
    isLoading.value = false
    await scrollToBottom()
  }
}
</script>

<style scoped>
.deepseek-chat {
  display: flex;
  flex-direction: column;
  height: 80vh;
  max-width: 800px;
  margin: 0 auto;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  background-color: #f5f7fa;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background-color: #fff;
  border-bottom: 1px solid #e4e7ed;
  border-radius: 8px 8px 0 0;
}

.chat-header h2 {
  margin: 0;
  font-size: 18px;
  color: #303133;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: #fff;
}

.message-item {
  display: flex;
  margin-bottom: 20px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.message-item.user {
  flex-direction: row-reverse;
}

.message-avatar {
  margin: 0 12px;
}

.message-content-wrapper {
  max-width: 70%;
}

.message-sender {
  font-size: 12px;
  color: #909399;
  margin-bottom: 4px;
}

.message-item.user .message-sender {
  text-align: right;
}

.message-content {
  padding: 12px 16px;
  border-radius: 8px;
  background-color: #f0f2f5;
  line-height: 1.5;
  word-wrap: break-word;
}

.message-item.user .message-content {
  background-color: #e6f7ff;
  color: #0052cc;
}

/* 加载动画 */
.loading-dots {
  display: flex;
  gap: 4px;
  padding: 12px 16px;
}

.loading-dots span {
  width: 8px;
  height: 8px;
  background-color: #909399;
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out both;
}

.loading-dots span:nth-child(1) {
  animation-delay: -0.32s;
}

.loading-dots span:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

.chat-input-area {
  padding: 20px;
  background-color: #fff;
  border-top: 1px solid #e4e7ed;
  border-radius: 0 0 8px 8px;
}

.input-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
}

.input-tip {
  font-size: 12px;
  color: #909399;
}

/* Markdown 样式 */
.message-content :deep(pre) {
  background-color: #282c34;
  color: #abb2bf;
  padding: 12px;
  border-radius: 6px;
  overflow-x: auto;
}

.message-content :deep(code) {
  font-family: 'Fira Code', monospace;
  font-size: 14px;
}

.message-content :deep(p) {
  margin: 0 0 8px 0;
}

.message-content :deep(p:last-child) {
  margin-bottom: 0;
}

.message-content :deep(a) {
  color: #1890ff;
  text-decoration: none;
}

.message-content :deep(a:hover) {
  text-decoration: underline;
}
</style>