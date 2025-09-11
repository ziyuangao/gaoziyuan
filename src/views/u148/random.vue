<template>
    <div class="random-generator">
        <el-form :model="form" label-width="120px">
            <el-form-item label="前缀">
                <el-input v-model="form.prefix" :minlength="0" :maxlength="6" placeholder="可选，最多6个字符"
                    clearable></el-input>
            </el-form-item>

            <el-form-item label="随机数长度">
                <el-input-number v-model="form.randomLength" :min="1" :max="9"></el-input-number>
            </el-form-item>

            <el-form-item label="是否携带特殊字符">
                <el-select v-model="form.specialChars" placeholder="请选择">
                    <el-option label="是" value="是"></el-option>
                    <el-option label="否" value="否"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="generateRandomString">生成</el-button>
            </el-form-item>
        </el-form>

        <div class="history-container" v-if="historyResults.length > 0">
            <div class="flex-container">
                <div class="history-title">生成历史</div>
                <el-button size="small" class="clear-btn" @click="clearHistory">清空历史</el-button>
            </div>
            <div v-for="item in historyResults" :key="item.id" class="history-item">
                <span class="result-label">{{ item.timestamp }}</span>
                <span>{{ item.value }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const form = ref({
    prefix: '',
    randomLength: 3,
    specialChars: '否'
});

const historyResults = ref([]);

const generateRandomString = () => {
    // 定义字符集
    const numbers = '0123456789';
    const specials = '@#?';
    let charset = numbers;

    // 如果选择了携带特殊字符，则添加到字符集
    if (form.value.specialChars === '是') {
        charset += specials;
    }

    // 生成随机部分
    let randomPart = '';
    for (let i = 0; i < form.value.randomLength; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        randomPart += charset[randomIndex];
    }

    // 组合结果
    const result = form.value.prefix ? form.value.prefix + randomPart : randomPart;

    // 添加到历史记录
    historyResults.value.unshift({
        id: Date.now(),
        value: result,
        timestamp: new Date().toLocaleTimeString()
    });

    return result;
};

const clearHistory = () => {
    historyResults.value = [];
};
</script>



<style lang="css" scoped>
.random-generator {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
}

.history-container {
    margin-top: 20px;
}

.history-title {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
    color: #409EFF;
}

.history-item {
    padding: 10px;
    margin: 8px 0;
    background-color: #f5f7fa;
    border-radius: 4px;
    border-left: 4px solid #409EFF;
}

.result-label {
    font-weight: bold;
    color: #606266;
    margin-right: 10px;
}

.flex-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.clear-btn {
    margin-left: 10px;
}
</style>