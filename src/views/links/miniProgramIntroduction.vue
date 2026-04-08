<template>
    <div class="miniProgramIntro">
        <main class="miniProgramIntro-content">
            <page-title>
                <template #image>
                    <el-icon>
                        <Iphone />
                    </el-icon>
                </template>
                <div>小程序项目介绍与评审 / weapp-gaoziyuan</div>
            </page-title>

            <section class="section">
                <el-card shadow="hover">
                    <template #header>
                        <div class="cardHeader">
                            <span class="cardTitle">1）工作目录（Workspace）</span>
                            <div class="headerTags">
                                <el-tag type="success" effect="plain">微信小程序 · 原生</el-tag>
                                <el-tag type="info" effect="plain">libVersion: 3.13.2</el-tag>
                            </div>
                        </div>
                    </template>

                    <el-descriptions :column="1" border>
                        <el-descriptions-item label="仓库路径">
                            <span class="mono">C:\Users\ziyua\Documents\weapp-gaoziyuan</span>
                        </el-descriptions-item>
                        <el-descriptions-item label="顶层结构（摘要）">
                            <pre class="treeText">{{ projectTreeText }}</pre>
                        </el-descriptions-item>
                        <el-descriptions-item label="全局配置要点">
                            <div class="desc">
                                <div>- <span class="mono">app.json</span>：声明 pages、tabBar、window、lazyCodeLoading 等</div>
                                <div>- <span class="mono">project.config.json</span>：微信开发者工具工程配置（压缩、sourceMap、ES6）</div>
                                <div>- <span class="mono">sitemap.json</span>：默认允许抓取所有页面</div>
                            </div>
                        </el-descriptions-item>
                    </el-descriptions>
                </el-card>
            </section>

            <section class="section">
                <page-title>
                    <template #image>
                        <el-icon>
                            <MapLocation />
                        </el-icon>
                    </template>
                    <div>2）路由（pages）与页面功能清单</div>
                </page-title>

                <el-card shadow="hover">
                    <el-alert type="info" show-icon :closable="false" title="说明"
                        description="小程序路由由 app.json 的 pages 数组决定；tabBar.list 中的 pagePath 是底部导航的入口页。下面按当前代码读取到的页面做功能梳理与抽样评审。" />

                    <el-divider />

                    <div class="subTitle">TabBar（3 个入口页）</div>
                    <el-table :data="tabbarTable" stripe border>
                        <el-table-column prop="text" label="Tab 文案" width="120" />
                        <el-table-column prop="pagePath" label="pagePath" min-width="260" />
                        <el-table-column prop="purpose" label="主要功能" min-width="360" />
                        <el-table-column prop="notes" label="备注" min-width="280" />
                    </el-table>

                    <el-divider />

                    <div class="subTitle">全部 pages（按 app.json 顺序）</div>
                    <el-table :data="pageTable" stripe border>
                        <el-table-column prop="page" label="页面" min-width="260" />
                        <el-table-column prop="title" label="标题/定位" min-width="180" />
                        <el-table-column prop="apis" label="涉及接口/能力" min-width="360" />
                        <el-table-column prop="notes" label="实现要点" min-width="360" />
                    </el-table>
                </el-card>
            </section>

            <section class="section">
                <page-title>
                    <template #image>
                        <el-icon>
                            <Search />
                        </el-icon>
                    </template>
                    <div>3）项目内容分析与代码评审</div>
                </page-title>

                <el-card shadow="hover">
                    <div class="twoCol">
                        <div class="pane">
                            <div class="subTitle">亮点（做得不错的点）</div>
                            <ul class="list">
                                <li>
                                    <b>功能完整度高</b>：工具页覆盖查询、计算、列表、媒体、Canvas 生成等多种典型场景。
                                </li>
                                <li>
                                    <b>交互细节有照顾</b>：多页面都做了 loading/空态/重试/按钮可用性校验（例如 BMI、油价、答案之书）。
                                </li>
                                <li>
                                    <b>可配置首页菜单</b>：通过 <span class="mono">routeConfig</span>（storage）让用户自定义展示项，结构清晰。
                                </li>
                                <li>
                                    <b>性能意识</b>：启用 <span class="mono">lazyCodeLoading:
                                        requiredComponents</span>；部分页面避免重复请求（例如公告栏“每日只展示一次”）。
                                </li>
                            </ul>
                        </div>

                        <div class="pane">
                            <div class="subTitle">主要问题（按风险优先级）</div>
                            <el-timeline>
                                <el-timeline-item timestamp="高" placement="top">
                                    <div class="timelineTitle">敏感信息明文写入仓库</div>
                                    <div class="timelineDesc">
                                        <span class="mono">utils/util.js</span> 中存在 <span class="mono">NASA_KEY</span> 与
                                        <span class="mono">uAPi_KEY</span> 明文。
                                        这会导致 Key 被轻易抓包/反编译获取，存在额度盗用与封禁风险。
                                    </div>
                                </el-timeline-item>
                                <el-timeline-item timestamp="中" placement="top">
                                    <div class="timelineTitle">音频实例生命周期不稳（白噪音）</div>
                                    <div class="timelineDesc">
                                        <span class="mono">pages/sleep/index.js</span> 在 <span
                                            class="mono">onHide</span> 就
                                        <span class="mono">destroy()</span>，用户切后台再回来可能无法继续播放；同时全局创建单例也会影响多页面资源管理。
                                    </div>
                                </el-timeline-item>
                                <el-timeline-item timestamp="低" placement="top">
                                    <div class="timelineTitle">请求封装缺失，重复代码多</div>
                                    <div class="timelineDesc">
                                        多处 <span class="mono">wx.request</span> 手写超时、错误 toast、字段判空等逻辑；可抽成
                                        <span class="mono">utils/request.js</span>（统一超时、错误结构、loading）。
                                    </div>
                                </el-timeline-item>
                            </el-timeline>
                        </div>
                    </div>

                    <el-divider />

                </el-card>
            </section>

            <section class="section">
                <page-title>
                    <template #image>
                        <el-icon>
                            <Star />
                        </el-icon>
                    </template>
                    <div>4）综合评分（满分 10 分）</div>
                </page-title>

                <el-card shadow="hover">
                    <el-descriptions :column="2" border>
                        <el-descriptions-item label="功能完整度">
                            <el-tag type="success" effect="plain">8/10</el-tag>
                            <div class="desc">工具种类丰富，覆盖常见交互与能力（请求/列表/Canvas/音频）。</div>
                        </el-descriptions-item>
                        <el-descriptions-item label="代码质量与可维护性">
                            <el-tag type="warning" effect="plain">6/10</el-tag>
                            <div class="desc">重复 request、命名不一致、部分页面空壳。</div>
                        </el-descriptions-item>
                        <el-descriptions-item label="安全与合规">
                            <el-tag type="danger" effect="plain">4/10</el-tag>
                            <div class="desc">Key 明文属于硬伤；建议尽快改为服务端下发或走中转。</div>
                        </el-descriptions-item>
                        <el-descriptions-item label="用户体验">
                            <el-tag type="success" effect="plain">7/10</el-tag>
                            <div class="desc">有 loading/空态/校验与轻提示，整体体验偏“干净实用”。</div>
                        </el-descriptions-item>
                    </el-descriptions>

                    <el-divider />

                    <el-alert type="success" show-icon :closable="false" title="最终评分" :description="finalScoreText" />
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
import { Iphone, MapLocation, Search, Star } from '@element-plus/icons-vue'

defineOptions({
    name: 'MiniProgramIntroduction',
})

const projectTreeText = computed(() => {
    return [
        'weapp-gaoziyuan/',
        '├─ app.js',
        '├─ app.json                     # 路由 pages + tabBar + window 等',
        '├─ app.wxss',
        '├─ project.config.json          # 微信开发者工具工程配置',
        '├─ project.private.config.json  # 本机私有配置（不应依赖）',
        '├─ sitemap.json',
        '├─ README.md',
        '├─ assets/                      # 图标/图片等静态资源',
        '├─ utils/',
        '│  └─ util.js                   # 常量/菜单配置（含 Key：建议下沉）',
        '└─ pages/',
        '   ├─ tabbar/                   # TabBar 入口页（gong/ju/xiang）',
        '   ├─ mlocation/                # 手机归属地查询（uapis）',
        '   ├─ lol/                      # LOL 英雄列表（腾讯接口）',
        '   ├─ lolDetail/                # LOL 英雄详情/皮肤/技能',
        '   ├─ bmi/                      # BMI 计算（xxapi）',
        '   ├─ gas/                      # 油价查询（xxapi）',
        '   ├─ dog/                      # 舔狗日记 + Canvas 生成图（xxapi + Canvas）',
        '   ├─ beautiful/                # 随机图片（多 API 池 + 重试/冷却）',
        '   ├─ playboy/                  # 仅供测试（未详细抽样）',
        '   ├─ book/                     # 答案之书（uapis）',
        '   ├─ news/                     # 热榜聚合（uapis）',
        '   ├─ nasa/                     # NASA APOD + 翻译（NASA + uapis）',
        '   ├─ setting/                  # 首页菜单配置（storage routeConfig）',
        '   └─ sleep/                    # 白噪音（InnerAudioContext + 定时）',
    ].join('\n')
})

const tabbarTable = computed(() => [
    {
        text: '工',
        pagePath: 'pages/tabbar/gong/index',
        purpose: '首页/工具入口聚合（按用户配置展示菜单项）+ 每日公告（名言）',
        notes: '依赖 storage: routeConfig；名言接口：uapis /saying（带 Bearer）',
    },
    {
        text: '具',
        pagePath: 'pages/tabbar/ju/index',
        purpose: 'Tab 入口页（当前为空壳）',
        notes: '建议补齐内容或从 tabBar 移除，避免“空页面”体验',
    },
    {
        text: '箱',
        pagePath: 'pages/tabbar/xiang/index',
        purpose: 'Tab 入口页（当前为空壳）',
        notes: '同上',
    },
])

const pageTable = computed(() => [
    {
        page: 'pages/tabbar/gong/index',
        title: '首页入口（工）',
        apis: 'uapis：/api/v1/saying（Bearer uAPi_KEY）',
        notes: '读取 routeConfig 过滤 utils.allMenuList；点击跳转；每日公告本地去重',
    },
    {
        page: 'pages/tabbar/ju/index',
        title: 'Tab（具）空页',
        apis: '—',
        notes: '仅保留默认生命周期函数',
    },
    {
        page: 'pages/tabbar/xiang/index',
        title: 'Tab（箱）空页',
        apis: '—',
        notes: '仅保留默认生命周期函数',
    },
    {
        page: 'pages/lol/index',
        title: 'LOL 英雄查询',
        apis: '腾讯：hero_list.js',
        notes: '本地过滤：关键词 + 角色定位 roles；点击进入详情页',
    },
    {
        page: 'pages/lolDetail/index',
        title: 'LOL 详情',
        apis: '腾讯：hero/{id}.js',
        notes: '皮肤过滤 iconImg；技能按固定顺序 passive/q/w/e/r 排序；swiper 切换皮肤',
    },
    {
        page: 'pages/bmi/index',
        title: 'BMI 计算',
        apis: 'xxapi：/api/bmi',
        notes: '输入校验完善；异步请求封装为 Promise；失败显示网络错误提示',
    },
    {
        page: 'pages/gas/index',
        title: '今日油价',
        apis: 'xxapi：/api/oilPrice',
        notes: '先拉全省数据，picker 选择后格式化展示；空态/重试逻辑清晰',
    },
    {
        page: 'pages/setting/index',
        title: '首页菜单配置',
        apis: 'storage：routeConfig',
        notes: 'checkbox-group 选择菜单 id；保存后 navigateBack，并尝试调用上一页 getMenuList 刷新',
    },
    {
        page: 'pages/mlocation/index',
        title: '手机归属地',
        apis: 'uapis：/api/v1/misc/phoneinfo（Bearer uAPi_KEY）',
        notes: '11 位手机号校验；输入变更清空旧结果；接口错误与网络错误 toast',
    },
    {
        page: 'pages/dog/index',
        title: '舔狗日记（生成图）',
        apis: 'xxapi：/api/dog；Canvas 2D；背景图（外链 OSS）',
        notes: '动态计算文字换行与画布高度；canvasToTempFilePath 导出图片；注意 drawText 的定义时机与资源清理',
    },
    {
        page: 'pages/beautiful/index',
        title: '随机图片',
        apis: 'xxapi：多个图片接口池',
        notes: 'API 池随机选择 + 历史去重 + 递归重试 + 冷却；注意内容合规与图片加载失败处理',
    },
    {
        page: 'pages/book/index',
        title: '答案之书',
        apis: 'uapis：/api/v1/answerbook/ask（Bearer uAPi_KEY）',
        notes: 'encodeURIComponent 拼接 question；状态 isLoading；返回字段判空',
    },
    {
        page: 'pages/news/index',
        title: '每日热榜',
        apis: 'uapis：/api/v1/misc/hotboard（Bearer uAPi_KEY）',
        notes: '二级 picker（分类/平台）；点击条目复制链接并引导浏览器打开',
    },
    {
        page: 'pages/nasa/index',
        title: 'NASA 天文图',
        apis: 'NASA：APOD；uapis：translate/text（Bearer uAPi_KEY）',
        notes: '图片加载状态由 bindload 控制；翻译结果字段需统一（当前代码存在不一致风险）',
    },
    {
        page: 'pages/sleep/index',
        title: '白噪音',
        apis: 'InnerAudioContext（本地 mp3）',
        notes: 'loop 播放 + 定时关闭；onHide 即 destroy 可能影响回到前台体验，建议调整生命周期策略',
    },
])

const finalScoreText = computed(() => {
    return [
        '综合评分：6.5 / 10。',
        '理由：功能覆盖面与交互完成度不错，但“Key 明文 + 工程化缺失”拉低了整体质量。',
        '如果先完成 Key 下沉与 request 统一封装，并修复白噪音等细节，预期可提升到 8 分左右。',
    ].join('\n')
})
</script>

<style scoped>
.miniProgramIntro {
    width: 100%;
    min-height: 100vh;
    background: #f2f6fc;
    padding: 50px 0 100px;
}

.miniProgramIntro-content {
    margin: 0 auto;
    width: 980px;
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

.subTitle {
    font-weight: 700;
    color: #303133;
    margin: 6px 0 12px;
}

.mono {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
        monospace;
}

.desc {
    color: #606266;
    line-height: 1.8;
}

.twoCol {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 12px;
}

.pane {
    background: #fff;
    border: 1px solid #ebeef5;
    border-radius: 10px;
    padding: 12px;
}

.list {
    margin: 0;
    padding-left: 18px;
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

.timelineTitle {
    font-weight: 700;
    color: #303133;
    margin-bottom: 6px;
}

.timelineDesc {
    color: #606266;
    line-height: 1.8;
}

@media (max-width: 900px) {
    .miniProgramIntro-content {
        width: 720px;
        padding: 0 12px;
    }

    .twoCol {
        grid-template-columns: 1fr;
    }
}

::v-deep(.menuList .el-button) {
    color: #606266;
}

::v-deep(.menuList .el-button:hover) {
    color: #67c23a;
}
</style>
