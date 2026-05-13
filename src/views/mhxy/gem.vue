<template>
    <div class="gem-calculator">
        <!-- 宝石输入区域 -->
        <el-card class="gem-input-card">
            <template #header>
                <span class="card-title">7级宝石藏宝阁价格（RMB）</span>
            </template>
            <el-row :gutter="20">
                <el-col v-for="gem in gems" :key="gem.name" :span="6">
                    <div class="gem-input-item">
                        <span class="gem-name">{{ gem.name }}：</span>
                        <el-input v-model="gem.seventhPrice" type="number" placeholder="输入7级价格" clearable
                            @input="handleGemPriceChange(gem)">
                            <template #append>RMB</template>
                        </el-input>
                    </div>
                </el-col>
            </el-row>
        </el-card>
        <!-- 金价区域 -->
        <el-card class="price-card">
            <template #header>
                <span class="card-title">金价设置</span>
            </template>
            <div class="price-row">
                <div class="price-item">
                    <span class="label">接口金价：</span>
                    <span class="value">{{ interfaceGoldPrice }} RMB</span>
                    <span class="unit">（3000万梦幻币）</span>
                </div>
                <div class="price-item">
                    <span class="label">自定义金价：</span>
                    <el-input v-model="customGoldPrice" type="number" placeholder="输入3000万梦幻币价格" style="width: 200px"
                        clearable @input="handleCustomPriceChange">
                        <template #append>RMB</template>
                    </el-input>
                    <span class="hint">（留空则使用接口金价）</span>
                </div>
                <div class="price-item">
                    <span class="label">当前比例：</span>
                    <span class="value highlight">{{ currentRatio.toFixed(0) }}</span>
                    <span class="unit">（1 RMB = 梦幻币）</span>
                </div>
            </div>
        </el-card>


        <!-- 表格展示区域 -->
        <el-card class="table-card" v-if="hasAnyData">
            <template #header>
                <span class="card-title">宝石价格明细</span>
            </template>
            <el-table :data="tableData" border stripe style="width: 100%">
                <el-table-column prop="gemName" label="宝石名称" width="100" fixed />
                <el-table-column prop="level" label="等级" width="80" />
                <el-table-column prop="rmbPrice" label="参考RMB价格">
                    <template #default="{ row }">
                        {{ formatRmb(row.rmbPrice) }}
                    </template>
                </el-table-column>
                <el-table-column prop="coinPrice" label="参考梦幻币价格">
                    <template #default="{ row }">
                        {{ formatCoin(row.coinPrice) }}
                    </template>
                </el-table-column>
                <el-table-column prop="rmbPurchase7" label="RMB收货价(7折)">
                    <template #default="{ row }">
                        {{ formatRmb(row.rmbPurchase7) }}
                    </template>
                </el-table-column>
                <el-table-column prop="coinPurchase7" label="梦幻币收货价(7折)">
                    <template #default="{ row }">
                        {{ formatCoin(row.coinPurchase7) }}
                    </template>
                </el-table-column>
                <el-table-column prop="rmbPurchase75" label="RMB收货价(7.5折)">
                    <template #default="{ row }">
                        {{ formatRmb(row.rmbPurchase75) }}
                    </template>
                </el-table-column>
                <el-table-column prop="coinPurchase75" label="梦幻币收货价(7.5折)">
                    <template #default="{ row }">
                        {{ formatCoin(row.coinPurchase75) }}
                    </template>
                </el-table-column>

                <el-table-column prop="rmbPurchase8" label="RMB收货价(8折)">
                    <template #default="{ row }">
                        {{ formatRmb(row.rmbPurchase8) }}
                    </template>
                </el-table-column>
                <el-table-column prop="coinPurchase8" label="梦幻币收货价(8折)">
                    <template #default="{ row }">
                        {{ formatCoin(row.coinPurchase8) }}
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

        <!-- 无数据提示 -->
        <el-empty v-else description="请输入任意宝石的7级价格查看明细" />
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { getMHXYPrice } from '@/api/request.js'

defineOptions({
    name: 'GemCalculator'
})

// 宝石数据定义
const gems = ref([
    { name: '太阳石', seventhPrice: '', type: 'normal' },
    { name: '月亮石', seventhPrice: '', type: 'normal' },
    { name: '光芒石', seventhPrice: '', type: 'normal' },
    { name: '黑宝石', seventhPrice: '', type: 'normal' },
    { name: '红玛瑙', seventhPrice: '', type: 'normal' },
    { name: '舍利子', seventhPrice: '', type: 'normal' },
    { name: '星辉石', seventhPrice: '', type: 'special' },
    { name: '翡翠石', seventhPrice: '', type: 'normal' }
])

// 金价相关
const interfaceGoldPrice = ref(0)
const customGoldPrice = ref('')
const currentGoldPrice = ref(0)

// 计算比例（保留5位小数）
const currentRatio = computed(() => {
    if (currentGoldPrice.value <= 0) return 0
    return 30000000 / currentGoldPrice.value
})

// 表格数据
const tableData = ref([])

// 格式化RMB（保留2位小数）
const formatRmb = (value) => {
    if (value === undefined || value === null) return '--'
    return `¥${value.toFixed(2)}`
}

// 格式化梦幻币（整数）
const formatCoin = (value) => {
    if (value === undefined || value === null) return '--'
    return `${((value / 10000).toFixed(2))} 万两`
}

// 计算某宝石1~7级数据
const calculateGemData = (gem, goldRatio) => {
    const seventhRmb = parseFloat(gem.seventhPrice)
    if (isNaN(seventhRmb) || seventhRmb <= 0) return []

    // 计算1级RMB价格
    let level1Rmb
    if (gem.type === 'special') {
        // 星辉石：3合1，7级 = 1级 × 729
        level1Rmb = seventhRmb / 729
    } else {
        // 普通宝石：2合1，7级 = 1级 × 64
        level1Rmb = seventhRmb / 64
    }

    const result = []
    for (let level = 1; level <= 7; level++) {
        // 计算倍数
        let multiplier
        if (gem.type === 'special') {
            multiplier = Math.pow(3, level - 1)
        } else {
            multiplier = Math.pow(2, level - 1)
        }

        // RMB价格
        const rmbPrice = level1Rmb * multiplier

        // 梦幻币价格
        const coinPrice = rmbPrice * goldRatio

        // 收货价（7折）
        const rmbPurchase7 = rmbPrice * 0.7
        const coinPurchase7 = coinPrice * 0.7

        // 收货价（75折）
        const rmbPurchase75 = rmbPrice * 0.75
        const coinPurchase75 = coinPrice * 0.75

        // 收货价（8折）
        const rmbPurchase8 = rmbPrice * 0.8
        const coinPurchase8 = coinPrice * 0.8


        result.push({
            gemName: gem.name,
            level,
            rmbPrice,
            coinPrice,
            rmbPurchase7,
            coinPurchase7,
            rmbPurchase75,
            coinPurchase75,
            rmbPurchase8,
            coinPurchase8
        })
    }
    return result
}

// 更新表格数据
const updateTableData = () => {
    if (currentGoldPrice.value <= 0) {
        tableData.value = []
        return
    }

    const allData = []
    gems.value.forEach(gem => {
        if (gem.seventhPrice && gem.seventhPrice !== '') {
            const gemData = calculateGemData(gem, currentRatio.value)
            allData.push(...gemData)
        }
    })
    tableData.value = allData
}

// 宝石价格变化
const handleGemPriceChange = () => {
    updateTableData()
}

// 自定义金价变化
const handleCustomPriceChange = () => {
    if (customGoldPrice.value && !isNaN(parseFloat(customGoldPrice.value))) {
        currentGoldPrice.value = parseFloat(customGoldPrice.value)
    } else {
        currentGoldPrice.value = interfaceGoldPrice.value
    }
    updateTableData()
}

// 监听金价变化
watch(currentGoldPrice, () => {
    updateTableData()
})

// 是否有任何数据
const hasAnyData = computed(() => tableData.value.length > 0)

// 获取接口金价
const fetchGoldPrice = async () => {
    try {
        const res = await getMHXYPrice()
        if (res.data && res.data.yxbPrices) {
            interfaceGoldPrice.value = res.data.yxbPrices.yxbPrice || 0
            // 如果没有自定义金价，使用接口金价
            if (!customGoldPrice.value) {
                currentGoldPrice.value = interfaceGoldPrice.value
            }
        }
    } catch (err) {
        console.error('获取金价失败', err)
        // 接口失败时允许手动输入
        if (!customGoldPrice.value) {
            currentGoldPrice.value = 0
        }
    }
}

onMounted(() => {
    fetchGoldPrice()
})
</script>

<style scoped>
.gem-calculator {
    padding: 20px;
    max-width: 1400px;
    margin: 0 auto;
}

.card-title {
    font-size: 18px;
    font-weight: bold;
}

.price-card {
    margin-bottom: 20px;
}

.price-row {
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    align-items: center;
}

.price-item {
    display: flex;
    align-items: center;
    gap: 8px;
}

.label {
    font-weight: 500;
    color: #606266;
}

.value {
    font-size: 18px;
    font-weight: bold;
    color: #303133;
}

.value.highlight {
    color: #e6a23c;
}

.unit {
    font-size: 12px;
    color: #909399;
}

.hint {
    font-size: 12px;
    color: #909399;
}

.gem-input-card {
    margin-bottom: 20px;
}

.gem-input-item {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    gap: 10px;
}

.gem-name {
    width: 90px;
    font-weight: 500;
}

.table-card {
    margin-top: 10px;
}

:deep(.el-input-group__append) {
    background-color: #f5f7fa;
}
</style>