<template>
    <div>
        <el-row>
            <el-col :span="6">时间 {{ baseInfo.date }}</el-col>
            <el-col :span="6">{{ baseInfo.area }}·{{ baseInfo.server }}</el-col>
            <el-col :span="6"><el-link href="https://www.aimhxy.com/mhb/info/935?period=1" target="_blank"
                    type="primary">金价走势</el-link></el-col>
        </el-row>
        <div>
            <el-input v-model="keyword" style="max-width: 600px" placeholder="请输入搜索内容" size="large">
                <template #prepend>关键字</template>
            </el-input>
        </div>
        <div v-loading="loading" element-loading-text="加载中...">
            <div v-if="!loading && filterList.length === 0" class="empty-tip">暂无数据</div>
            <div class="price-list">
                <el-row v-for="item in filterList" :key="item.id">
                    <el-col :span="6">名称 {{ item.label }}</el-col>
                    <el-col :span="6">{{ item.price }} W</el-col>
                    <el-col :span="6">更新时间 {{ item.date }}</el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script setup>
import { getMHXYPrice } from '@/api/request.js'
import { onMounted, reactive, ref, computed } from 'vue';

defineOptions({
    name: 'TablePrice'
})

let baseInfo = reactive({})
let priceList = ref([])
let keyword = ref('')
let loading = ref(true)

const filterList = computed(() => {
    if (!keyword.value) {
        return priceList.value
    }
    return priceList.value.filter(item => {
        return item.label.includes(keyword.value)
    })
})

onMounted(() => {
    getMHXYPrice().then(res => {
        if (res.data.yxbPrices) {
            Object.assign(baseInfo, res.data.yxbPrices)
        }
        if (Array.isArray(res.data.priceDetails)) {
            priceList.value = res.data.priceDetails.filter(item => {
                // 优化：保留原始 value，新增 price 字段显示
                item.price = Number(item.value).toFixed(2)
                return item.label
            })
        }
        console.log(res)
    }).catch(err => {
        console.error('加载失败', err)
    }).finally(() => {
        loading.value = false
    })
})
</script>

<style scoped>
/* 样式部分完全保持原样，只添加一个空状态提示样式 */
.empty-tip {
    text-align: center;
    padding: 40px;
    color: #909399;
    font-size: 14px;
}
</style>