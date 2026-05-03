<template>
    <div class="tab-table-container">
        <el-row type="flex" align="middle">
            <el-col :span="8">
                <el-space wrap>
                    <el-text size="large">慈心渡鬼简易攻略</el-text>
                    <el-button type="success" size="default">
                        {{ activeTab === 'round1' ? '必需拿' : '一步棋' }}
                    </el-button>
                    <el-button type="danger" size="default">
                        {{ activeTab === 'round1' ? '不要拿' : '太远了' }}
                    </el-button>
                    <el-button type="primary" size="default">建议拿</el-button>
                </el-space>
            </el-col>
            <el-col :span="16">
                <el-radio-group v-model="activeTab">
                    <el-radio value="round1" size="large">第一轮</el-radio>
                    <el-radio value="round2" size="large">第二轮</el-radio>
                </el-radio-group>
            </el-col>
        </el-row>

        <!-- 8x8 表格 -->
        <div class="table-wrapper">
            <table class="data-table">
                <tbody>
                    <tr v-for="(row, index) in cxdgDataArr" :key="index">
                        <td v-for="col in row" :key="col.id" class="table-cell">
                            <div :class="[computedClass(col), 'cell-content']">
                                <div class="line line-name">
                                    <el-text type="primary" size="large">{{ col.name }}</el-text>
                                </div>
                                <div class="line line-lbs">
                                    {{ col.lbs }}
                                </div>
                                <!-- <div class="line line-type">{{ col.type }}</div> -->
                                <div class="line line-lbstext">{{ col.lbsText }}</div>
                                <div class="line line-tips">{{ col.tips }}</div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import cxdgData from '@/dataPool/cxdg.json'

defineOptions({
    name: 'CxdgTable'
})
// 当前激活的tab: 'round1' 或 'round2'
const activeTab = ref('round2')
const cxdgDataArr = cxdgData;
const computedClass = (col) => {
    const colType = activeTab.value == 'round1' ? col.round1Type : col.round2Type;
    const bgConfig = {
        'danger': 'table-cell-danger',
        'success': 'table-cell-success',
        'info': 'table-cell-info',
    }

    return bgConfig[colType] || ''
};
</script>

<style scoped>
.tab-table-container {
    padding: 10px;
    box-sizing: border-box;
}

.table-wrapper {
    width: 700px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background: white;
}

.data-table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
}

.data-table td {
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0.1);
}


.line {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.table-cell-danger {
    background-color: var(--el-color-danger-light-7);
}

.table-cell-success {
    background-color: var(--el-color-success-light-7);
}

.table-cell-info {
    background-color: var(--el-color-primary-light-7);
}
</style>