<template>
    <el-card >
        <div v-for="(item,index) in data" :key="item.title">
            <el-divider v-if="index > 0" ></el-divider>
            <div class="card-title" >
                <div>
                    <h3>{{ item.title }}</h3>
                    <div>
                        <el-link 
                            :href="item.subtitlelink" 
                            target="_blank" 
                            :underline="item.disabled?'false':'always'"
                            :disabled="item.disabled"
                        >{{ item.subtitle }}</el-link>
                    </div>
                </div>
                <time>{{ item.time }}</time>
            </div>
        </div>
    </el-card>
</template>

<script setup>
    /**
     * @description: 信息卡片
     * @param {Array} data
     * data 示例:
     * [ 
     *  {
     *      title: '职位名称 | 工作性质 | 职位级别',
     *      subtitle: '公司名称',
     *      subtitlelink: '公司链接',
     *      disabled: false, // 可选，是否禁用链接，默认 false
     *      time: '时间'
     *  }
     * ]
     */

defineOptions({
    name: 'InfoCard'
})
defineProps({
    data: {
        type: Array,
        required: true,
        default: () => []
    },
})
</script>

<style lang="scss" scoped>
.card-title {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 20px;
}

.card-title ~ .card-title{
    margin-top: 20px;
}

.card-title h3 {
    margin: 0 0 8px 0;
    font-size: 16px;
    font-weight: 600;
    color: #303133;
}

.card-title time {
    color: #909399;
    font-size: 14px;
    white-space: nowrap;
}
</style>