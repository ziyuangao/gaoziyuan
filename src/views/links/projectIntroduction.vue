<template>
    <div class="projectIntro">
        <main class="projectIntro-content">
            <page-title>
                <template #image>
                    <el-icon>
                        <Document />
                    </el-icon>
                </template>
                <div>项目介绍 / Project Introduction</div>
            </page-title>

            <section class="section">
                <el-card shadow="hover">
                    <template #header>
                        <div class="cardHeader">
                            <span class="cardTitle">项目概览</span>
                            <el-tag type="success" effect="plain">Vue 3 + Vite</el-tag>
                        </div>
                    </template>

                    <el-descriptions :column="2" border>
                        <el-descriptions-item label="项目名称">
                            <span class="mono">small-note</span>
                        </el-descriptions-item>
                        <el-descriptions-item label="定位">
                            个人网站 / 笔记与作品集展示（练手项目）
                        </el-descriptions-item>
                        <el-descriptions-item label="构建产物目录">
                            <span class="mono">docs/</span>（适配 GitHub Pages / 静态托管）
                        </el-descriptions-item>
                        <el-descriptions-item label="路由模式">
                            Hash（<span class="mono">createWebHashHistory</span>）
                        </el-descriptions-item>
                        <el-descriptions-item label="UI 组件库">
                            Element Plus
                        </el-descriptions-item>
                        <el-descriptions-item label="状态管理">
                            Pinia（<span class="mono">src/stores/userStore.js</span>）
                        </el-descriptions-item>
                        <el-descriptions-item label="HTTP">
                            Axios（封装于 <span class="mono">src/api/axios.js</span>）
                        </el-descriptions-item>
                        <el-descriptions-item label="代码规范">
                            ESLint + Prettier（仓库已配置脚本）
                        </el-descriptions-item>
                    </el-descriptions>

                    <div class="tips">
                        <el-alert type="info" show-icon :closable="false" title="说明"
                            description="本页面内容来自当前仓库真实代码结构与路由配置，用于快速理解项目全貌、模块边界与页面入口。" />
                    </div>
                </el-card>
            </section>

            <section class="section">
                <page-title>
                    <template #image>
                        <el-icon>
                            <Cpu />
                        </el-icon>
                    </template>
                    <div>技术栈与依赖</div>
                </page-title>
                <el-card shadow="hover">
                    <div class="tagGroup">
                        <el-tag effect="plain">Vue 3</el-tag>
                        <el-tag effect="plain">Vite</el-tag>
                        <el-tag effect="plain">Vue Router 4</el-tag>
                        <el-tag effect="plain">Pinia</el-tag>
                        <el-tag effect="plain">Element Plus</el-tag>
                        <el-tag effect="plain">Axios</el-tag>
                        <el-tag effect="plain">ECharts</el-tag>
                        <el-tag effect="plain">Three.js</el-tag>
                        <el-tag effect="plain">dayjs</el-tag>
                        <el-tag effect="plain">marked</el-tag>
                        <el-tag effect="plain">dompurify</el-tag>
                        <el-tag effect="plain">OpenAI SDK</el-tag>
                    </div>
                    <el-divider />
                    <el-descriptions :column="1">
                        <el-descriptions-item label="构建与发布">
                            <span class="mono">vite build</span> 输出到 <span class="mono">docs/</span>，并设置
                            <span class="mono">base: './'</span> 方便静态部署。
                        </el-descriptions-item>
                        <el-descriptions-item label="环境与 API BaseURL">
                            优先读取 <span class="mono">VITE_API_BASE_URL</span>；否则 development 指向本地
                            <span class="mono">http://localhost:8888</span>，production 指向站点域名。
                        </el-descriptions-item>
                    </el-descriptions>
                </el-card>
            </section>

            <section class="section">
                <page-title>
                    <template #image>
                        <el-icon>
                            <Connection />
                        </el-icon>
                    </template>
                    <div>项目架构（分层与数据流）</div>
                </page-title>
                <el-card shadow="hover">
                    <el-timeline>
                        <el-timeline-item timestamp="入口层" placement="top">
                            <div class="timelineTitle">应用启动与全局挂载</div>
                            <div class="timelineDesc">
                                <span class="mono">src/main.js</span> 创建应用，挂载 Router / Element Plus / Pinia，并注册自定义指令
                                <span class="mono">v-myslide-in</span>。
                            </div>
                        </el-timeline-item>
                        <el-timeline-item timestamp="路由层" placement="top">
                            <div class="timelineTitle">页面组织与兜底</div>
                            <div class="timelineDesc">
                                <span class="mono">src/router/index.js</span>
                                统一注册路由（top/tools/u148/links），并在全局前置守卫中对不存在路由跳转到
                                <span class="mono">/404</span>。
                            </div>
                        </el-timeline-item>
                        <el-timeline-item timestamp="页面层" placement="top">
                            <div class="timelineTitle">views 作为“业务页面”容器</div>
                            <div class="timelineDesc">
                                以 <span class="mono">src/views/*</span> 为单位组织页面；页面通过组合公共组件（如 <span
                                    class="mono">menuList</span>、<span class="mono">pageTitle</span>）与业务组件来完成展示与交互。
                            </div>
                        </el-timeline-item>
                        <el-timeline-item timestamp="组件层" placement="top">
                            <div class="timelineTitle">components 复用与沉淀</div>
                            <div class="timelineDesc">
                                <span class="mono">src/components/common</span> 提供通用 UI；<span
                                    class="mono">src/views/plans/components</span> 等则提供页面内模块化组件。
                            </div>
                        </el-timeline-item>
                        <el-timeline-item timestamp="数据与服务层" placement="top">
                            <div class="timelineTitle">API / Store / 数据池</div>
                            <div class="timelineDesc">
                                API 封装位于 <span class="mono">src/api</span>；Key 等全局状态在 <span class="mono">Pinia
                                    Store</span>
                                中管理；静态数据位于
                                <span class="mono">src/dataPool</span>（例如 21 天计划数据）。
                            </div>
                        </el-timeline-item>
                    </el-timeline>

                    <el-divider />
                    <el-collapse accordion>
                        <el-collapse-item name="flow" title="典型数据流示例：Home 页获取 Key">
                            <div class="monoBlock">
                                Home（views/home/index.vue） → 调用 API（src/api/request.js:getMyKey） →
                                Axios 封装（src/api/axios.js） → Pinia 写入（stores/userStore.js:SETGAODEKEY）
                            </div>
                        </el-collapse-item>
                        <el-collapse-item name="directive" title="典型交互增强：滑动进入指令 v-myslide-in">
                            <div class="monoBlock">
                                指令（src/directives.js）基于 IntersectionObserver + Web Animations
                                API，在元素进入视口时播放动画，减少页面一次性渲染的突兀感。
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                </el-card>
            </section>

            <section class="section">
                <page-title>
                    <template #image>
                        <el-icon>
                            <Grid />
                        </el-icon>
                    </template>
                    <div>核心页面与模块简介</div>
                </page-title>

                <el-row :gutter="12">
                    <el-col :xs="24" :sm="12" :md="8" v-for="item in moduleCards" :key="item.title">
                        <el-card shadow="hover" class="moduleCard">
                            <div class="moduleTitle">
                                <el-tag size="small" effect="plain" :type="item.type">{{ item.group }}</el-tag>
                                <span>{{ item.title }}</span>
                            </div>
                            <div class="modulePath mono">{{ item.path }}</div>
                            <div class="moduleDesc">{{ item.desc }}</div>
                        </el-card>
                    </el-col>
                </el-row>
            </section>

            <section class="section">
                <page-title>
                    <template #image>
                        <el-icon>
                            <MapLocation />
                        </el-icon>
                    </template>
                    <div>项目地图（目录树与路由一览）</div>
                </page-title>

                <el-card shadow="hover">
                    <el-tabs v-model="activeTab" class="tabs">
                        <el-tab-pane label="目录结构" name="tree">
                            <div class="twoCol">
                                <div class="pane">
                                    <div class="subTitle">推荐理解顺序</div>
                                    <ol class="orderList">
                                        <li><span class="mono">src/main.js</span>：应用入口与全局注册</li>
                                        <li><span class="mono">src/router/index.js</span>：全部页面入口与路由守卫</li>
                                        <li><span class="mono">src/views/</span>：各业务页面</li>
                                        <li><span class="mono">src/components/</span>：公共组件与可复用组件</li>
                                        <li><span class="mono">src/api/</span>、<span
                                                class="mono">src/stores/</span>：请求与状态</li>
                                        <li><span class="mono">src/dataPool/</span>：静态数据</li>
                                    </ol>
                                </div>
                                <div class="pane">
                                    <div class="subTitle">项目目录树（摘要）</div>
                                    <pre class="treeText">{{ projectTreeText }}</pre>
                                </div>
                            </div>
                        </el-tab-pane>

                        <el-tab-pane label="路由地图" name="routes">
                            <el-table :data="routeTable" stripe border>
                                <el-table-column prop="group" label="分组" width="110" />
                                <el-table-column prop="path" label="path" min-width="200" />
                                <el-table-column prop="name" label="name" min-width="150" />
                                <el-table-column prop="title" label="meta.title" min-width="180" />
                                <el-table-column prop="component" label="component" min-width="240" />
                            </el-table>

                        </el-tab-pane>
                    </el-tabs>
                </el-card>
            </section>
        </main>

        <menuList />
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import menuList from '@/components/common/menuList.vue'
import pageTitle from '@/components/common/pageTitle.vue'
import {
    Connection,
    Cpu,
    Document,
    Grid,
    MapLocation,
} from '@element-plus/icons-vue'

defineOptions({
    name: 'ProjectIntroduction',
})

const activeTab = ref('tree')

const moduleCards = computed(() => [
    {
        group: '顶层页面',
        type: 'primary',
        title: '首页 Home',
        path: 'src/views/home/index.vue',
        desc: '组合 banner / menuList / content / footer，并在 mounted 时从后端函数拉取高德相关 Key 写入 Pinia。',
    },
    {
        group: '顶层页面',
        type: 'primary',
        title: '笔记 Notes',
        path: 'src/views/notes/index.vue',
        desc: '以卡片 + 外链列表方式组织内容；内置洗牌算法随机化展示，提供快速跳转到文档/表格/脑图等。',
    },
    {
        group: '顶层页面',
        type: 'primary',
        title: '关于 About',
        path: 'src/views/about/index.vue',
        desc: '使用 ECharts 渲染能力分布图，配合 pageTitle 与通用组件呈现履历与教育信息。',
    },
    {
        group: '功能页面',
        type: 'success',
        title: '21 天计划 Plans',
        path: 'src/views/plans/21Plans.vue',
        desc: '数据可视化页面：HealthChart/MetricCard/ProgressBar 等组件组合，读取 dataPool 中的静态 JSON 数据。',
    },
    {
        group: '工具集',
        type: 'warning',
        title: '本地音乐播放器',
        path: 'src/views/tools/music.vue',
        desc: '本地工具类页面集合之一（tools 路由组），用于演示可交付的小功能。',
    },
    {
        group: '娱乐/实验',
        type: 'danger',
        title: 'DeepSeek 对话',
        path: 'src/views/u148/deepseek.vue',
        desc: '通过 Netlify Functions 转发请求（talkToDeepseek），展示对话能力与 API 封装方式。',
    },
    {
        group: '快速链接',
        type: 'info',
        title: '滑动进入（指令示例）',
        path: 'src/views/links/slideIn.vue + src/directives.js',
        desc: '展示 v-myslide-in 指令的 IntersectionObserver 动画触发效果。',
    },
    {
        group: '通用组件',
        type: 'info',
        title: '菜单 Menu',
        path: 'src/components/common/menuList.vue + src/config/menu.js',
        desc: '统一导航入口，当前默认展示 homeMenuList（首页/笔记/照片墙/关于）。',
    },
])

const routeTable = computed(() => [
    // topRoutes
    { group: 'top', path: '/', name: 'Loading', title: '-', component: 'redirect:/home' },
    { group: 'top', path: '/home', name: 'HomePage', title: '首页', component: 'views/home/index.vue' },
    { group: 'top', path: '/notes', name: 'NoteList', title: '笔记', component: 'views/notes/index.vue' },
    { group: 'top', path: '/photos', name: 'PhotoWall', title: '照片墙', component: 'views/photos/index.vue' },
    { group: 'top', path: '/about', name: 'AboutMe', title: '关于我', component: 'views/about/index.vue' },
    { group: 'top', path: '/404', name: 'NotFound', title: '404', component: 'views/404/index.vue' },
    { group: 'top', path: '/plans', name: 'Plans', title: '我的计划', component: 'views/plans/21Plans.vue' },

    // toolsRoutes
    { group: 'tools', path: '/tools/coin', name: 'coin', title: 'every coin has two sides', component: 'views/tools/coin.vue' },
    { group: 'tools', path: '/tools/music', name: 'music', title: '本地音乐播放器', component: 'views/tools/music.vue' },
    { group: 'tools', path: '/tools/lol', name: '随机工具', title: '英雄联盟随机工具', component: 'views/tools/LOL.vue' },
    { group: 'tools', path: '/tools/randomName', name: 'random', title: '随机名字生成器', component: 'views/tools/randomName.vue' },

    // u148Routes
    { group: 'u148', path: '/u148/dog', name: 'Dog', title: '舔狗日记', component: 'views/u148/dog.vue' },
    { group: 'u148', path: '/u148/deepseek', name: 'deepseek', title: '-', component: 'views/u148/deepseek.vue' },
    { group: 'u148', path: '/u148/roadReplay', name: 'roadReplay', title: '轨迹回放', component: 'views/u148/roadReplay.vue' },

    // quickLinksRoutes
    { group: 'links', path: '/links/decorationBreak', name: 'decorationBreak', title: '文字背景断行', component: 'views/links/decorationBreak.vue' },
    { group: 'links', path: '/links/starrySky', name: 'starrySky', title: '星空背景', component: 'views/links/starrySky.vue' },
    { group: 'links', path: '/links/rotateTheEarth', name: 'rotateTheEarth', title: '转动地球', component: 'views/links/rotateTheEarth.vue' },
    { group: 'links', path: '/links/slidein', name: 'slidein', title: '滑动进入', component: 'views/links/slideIn.vue' },
])

const projectTreeText = computed(() => {
    return [
        'gaoziyuan/',
        '├─ docs/                         # 构建输出（静态部署产物）',
        '├─ src/',
        '│  ├─ main.js                     # 入口：Router/ElementPlus/Pinia/指令注册',
        '│  ├─ App.vue                      # 顶层：router-view 容器',
        '│  ├─ router/',
        '│  │  └─ index.js                  # 路由配置与守卫',
        '│  ├─ api/',
        '│  │  ├─ axios.js                  # Axios 封装（baseURL/请求方法）',
        '│  │  └─ request.js                # 业务请求（getMyKey/talkToDeepseek/...）',
        '│  ├─ stores/',
        '│  │  └─ userStore.js              # Pinia：Key/主题等状态（项目级）',
        '│  ├─ directives.js                # v-myslide-in 指令',
        '│  ├─ components/',
        '│  │  ├─ common/                   # menuList/pageTitle/infoCard/listItem 等',
        '│  │  └─ notesTemplate/            # 笔记模板类组件',
        '│  ├─ views/',
        '│  │  ├─ home/                     # 首页（banner/content/footer/userInfo）',
        '│  │  ├─ notes/                    # 笔记页',
        '│  │  ├─ photos/                   # 照片墙',
        '│  │  ├─ about/                    # 关于我（echarts 能力图等）',
        '│  │  ├─ plans/                    # 计划与健康数据报表',
        '│  │  ├─ tools/                    # 工具集合（coin/music/lol/randomName）',
        '│  │  ├─ u148/                     # 娱乐/实验（deepseek/舔狗日记/轨迹回放）',
        '│  │  └─ links/                    # 快速链接/效果实验（星空/地球/滑入/断行）',
        '│  ├─ dataPool/',
        '│  │  ├─ daily.json                # 日记/文本数据示例',
        '│  │  └─ plans/no1.json            # 21 天计划数据',
        '│  └─ assets/                      # 全局样式与资源',
        '└─ vite.config.js                  # Vite 配置（base、alias、构建输出到 docs）',
    ].join('\n')
})
</script>

<style scoped>
.projectIntro {
    width: 100%;
    min-height: 100vh;
    background: #f2f6fc;
    padding: 50px 0 100px;
}

.projectIntro-content {
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

.cardTitle {
    font-weight: 700;
    color: #303133;
}

.tips {
    margin-top: 14px;
}

.tagGroup {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
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
}

.timelineTitle {
    font-weight: 700;
    color: #303133;
    margin-bottom: 6px;
}

.timelineDesc {
    color: #606266;
    line-height: 1.8;
}

.moduleCard {
    margin-bottom: 12px;
    height: 100%;
}

.moduleTitle {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 700;
    color: #303133;
    margin-bottom: 10px;
}

.modulePath {
    font-size: 12px;
    color: #909399;
    margin-bottom: 10px;
}

.moduleDesc {
    color: #606266;
    line-height: 1.7;
}

.tabs :deep(.el-tabs__header) {
    margin-bottom: 12px;
}

.twoCol {
    display: grid;
    grid-template-columns: 1fr 1.3fr;
    gap: 12px;
}

.pane {
    background: #fff;
    border: 1px solid #ebeef5;
    border-radius: 10px;
    padding: 12px;
}

.subTitle {
    font-weight: 700;
    color: #303133;
    margin-bottom: 10px;
}

.orderList {
    padding-left: 16px;
    color: #606266;
    line-height: 1.9;
}

.treeText {
    margin: 0;
    padding: 12px;
    background: #0b1020;
    color: #d6e4ff;
    border-radius: 8px;
    overflow: auto;
    font-size: 12px;
    line-height: 1.7;
}

.routeTip {
    margin-top: 12px;
}

@media (max-width: 900px) {
    .projectIntro-content {
        width: 720px;
        padding: 0 12px;
    }

    .twoCol {
        grid-template-columns: 1fr;
    }
}

::deep(.menuList .el-button) {
    color: #606266;
}

::deep(.menuList .el-button:hover) {
    color: #67c23a;
}
</style>
