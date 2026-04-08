<template>
    <div class="backedService">
        <main class="backedService-content">
            <page-title>
                <template #image>
                    <el-icon>
                        <Connection />
                    </el-icon>
                </template>
                <div>后端服务介绍 / service-gaoziyuan</div>
            </page-title>

            <section class="section">
                <el-card shadow="hover">
                    <template #header>
                        <div class="cardHeader">
                            <span class="cardTitle">项目概览</span>
                            <div class="headerTags">
                                <el-tag type="success" effect="plain">Netlify Functions</el-tag>
                                <el-tag type="info" effect="plain">Node.js</el-tag>
                            </div>
                        </div>
                    </template>

                    <el-descriptions :column="2" border>
                        <el-descriptions-item label="仓库名称">
                            <span class="mono">service-gaoziyuan</span>
                        </el-descriptions-item>
                        <el-descriptions-item label="定位">
                            为前端站点提供轻量 API：Key 下发、类型查询、AI 对话转发等
                        </el-descriptions-item>
                        <el-descriptions-item label="部署形态">
                            Serverless（按函数拆分，按需扩展）
                        </el-descriptions-item>
                        <el-descriptions-item label="调用入口">
                            由前端通过 <span class="mono">VITE_API_BASE_URL</span> 指向对应站点域名
                        </el-descriptions-item>
                    </el-descriptions>

                    <div class="tips">
                        <el-alert type="info" show-icon :closable="false" title="说明"
                            description="该后端服务采用 Netlify Functions 方式部署：每个接口对应一个函数文件；配合统一的 CORS 与错误响应封装，便于快速迭代与前端联调。" />
                    </div>
                </el-card>
            </section>

            <section class="section">
                <page-title>
                    <template #image>
                        <el-icon>
                            <Tickets />
                        </el-icon>
                    </template>
                    <div>接口清单</div>
                </page-title>

                <el-card shadow="hover">
                    <el-table :data="apiList" stripe border>
                        <el-table-column prop="name" label="函数" width="140" />
                        <el-table-column prop="method" label="方法" width="110" />
                        <el-table-column prop="path" label="路径（相对）" min-width="220" />
                        <el-table-column prop="purpose" label="用途" min-width="260" />
                    </el-table>

                    <el-divider />

                    <el-collapse accordion>
                        <el-collapse-item name="deepseek" title="deepseek：对话转发（messages 方式）">
                            <div class="monoBlock">
                                Request: POST /.netlify/functions/deepseek
                                {"messages":[{"role":"user","content":"你好"}]}
                                ---
                                Response: {"success":true,"message":"..."}
                            </div>
                            <div class="desc">
                                该接口将前端的对话历史 <span class="mono">messages</span> 转发给 DeepSeek（OpenAI SDK
                                兼容调用），并进行基础校验与消息数量截断，避免超出
                                token 限制。
                            </div>
                        </el-collapse-item>

                        <el-collapse-item name="key" title="getkey：按 type 下发 key（从环境变量读取）">
                            <div class="monoBlock">
                                Request: POST /.netlify/functions/getkey
                                {"type":"gaode"}
                                ---
                                Response: "your_key_value"
                            </div>
                            <div class="desc">
                                通过 <span class="mono">keyMap</span> 将不同类型映射到环境变量（如 GAODE_KEY / NASA_KEY /
                                DEEPSEEK_KEY），前端无需直接暴露敏感信息。
                            </div>
                        </el-collapse-item>

                        <el-collapse-item name="types" title="gettypes：获取支持的 type 列表">
                            <div class="monoBlock">
                                Request: GET /.netlify/functions/gettypes
                                ---
                                Response:
                                {"success":true,"supportedTypes":["gaode","nasa","deepseek"],"timestamp":"..."}
                            </div>
                            <div class="desc">
                                返回当前后端支持的 key 类型列表，便于前端做类型提示或动态配置。
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </el-card>
            </section>

            <section class="section">
                <page-title>
                    <template #image>
                        <el-icon>
                            <Lock />
                        </el-icon>
                    </template>
                    <div>鉴权与安全（含 Token 校验）</div>
                </page-title>

                <el-card shadow="hover">

                    <el-descriptions :column="1" border>
                        <el-descriptions-item label="Token 校验（你已修复的点）">
                            前端请求需携带 Token（建议放在 <span class="mono">Authorization: Bearer &lt;token&gt;</span>
                            或自定义请求头），服务端在函数入口统一校验；
                            未携带或无效 Token 返回 <span class="mono">401</span>。
                        </el-descriptions-item>
                        <el-descriptions-item label="CORS 白名单">
                            通过 <span class="mono">cors-utils.js</span> 限定允许的 Origin（例如
                            <span class="mono">https://gaoziyuan.中国</span>、<span
                                class="mono">http://localhost:5173</span>），非白名单直接拒绝。
                        </el-descriptions-item>
                        <el-descriptions-item label="统一错误响应">
                            使用 <span class="mono">createErrorResponse(statusCode, message, corsHeaders)</span> 输出结构化错误体：
                            <span class="mono">{ success:false, error:"..." }</span>，便于前端统一 toast / 日志上报。
                        </el-descriptions-item>
                    </el-descriptions>

                </el-card>
            </section>

            <section class="section">
                <page-title>
                    <template #image>
                        <el-icon>
                            <Setting />
                        </el-icon>
                    </template>
                    <div>环境变量与配置</div>
                </page-title>

                <el-card shadow="hover">
                    <el-descriptions :column="1" border>
                        <el-descriptions-item label="Key 环境变量（示例）">
                            <span class="mono">GAODE_KEY</span>、<span class="mono">GAODE_ENCKEY</span>、<span
                                class="mono">NASA_KEY</span>、<span class="mono">DEEPSEEK_KEY</span>
                        </el-descriptions-item>
                        <el-descriptions-item label="DeepSeek 调用">
                            使用 OpenAI SDK 指定 <span class="mono">baseURL: https://api.deepseek.com</span>，并从 <span
                                class="mono">DEEPSEEK_KEY</span>（或兼容变量）读取密钥。
                        </el-descriptions-item>
                        <el-descriptions-item label="本地联调">
                            前端开发环境建议将 API base 指向本地 netlify dev（或你配置的本地函数端口），并把 <span
                                class="mono">http://localhost:5173</span> 加入
                            CORS 白名单。
                        </el-descriptions-item>
                    </el-descriptions>
                </el-card>
            </section>
        </main>

        <menuList />
    </div>
</template>

<script setup>
import { computed } from 'vue'
import menuList from '@/components/common/menuList.vue'
import pageTitle from '@/components/common/pageTitle.vue'
import { Connection, Lock, Setting, Tickets } from '@element-plus/icons-vue'

defineOptions({
    name: 'BackedService',
})

const apiList = computed(() => [
    {
        name: 'hello',
        method: 'GET',
        path: '/.netlify/functions/hello',
        purpose: '连通性测试（Hello World）',
    },
    {
        name: 'gettypes',
        method: 'GET',
        path: '/.netlify/functions/gettypes',
        purpose: '返回支持的 key 类型列表',
    },
    {
        name: 'getkey',
        method: 'POST',
        path: '/.netlify/functions/getkey',
        purpose: '按 type 下发对应 key（来自环境变量映射）',
    },
    {
        name: 'deepseek',
        method: 'POST',
        path: '/.netlify/functions/deepseek',
        purpose: 'DeepSeek 对话转发（messages 方式）',
    },
])
</script>

<style scoped>
.backedService {
    width: 100%;
    min-height: 100vh;
    background: #f2f6fc;
    padding: 50px 0 100px;
}

.backedService-content {
    margin: 0 auto;
    width: 920px;
    max-width: 100%;
}

.section {
    margin-bottom: 24px;
}

.cardHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
}

.headerTags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
}

.cardTitle {
    font-weight: 700;
    color: #303133;
}

.tips {
    margin-top: 14px;
}

.mono {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
        monospace;
}

.monoBlock {
    padding: 10px 12px;
    background: #0b1020;
    color: #d6e4ff;
    border-radius: 8px;
    line-height: 1.8;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
        monospace;
    font-size: 13px;
    white-space: pre-wrap;
}

.desc {
    margin-top: 10px;
    color: #606266;
    line-height: 1.8;
}

@media (max-width: 900px) {
    .backedService-content {
        width: 720px;
        padding: 0 12px;
    }
}

::deep(.menuList .el-button) {
    color: #606266;
}

::deep(.menuList .el-button:hover) {
    color: #67c23a;
}
</style>
