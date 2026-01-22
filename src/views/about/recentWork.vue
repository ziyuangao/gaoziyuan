<template>
    <section class="section recent-work">
        <page-title>
            <template #image>
                <el-image :src="work" fit="contain"></el-image>
            </template>
            <div>最近工作</div>
        </page-title>
        <infoCard :data="infoCardProps" />
    </section>
</template>

<script setup>
import work from '@/assets/pagetitle/work.png'
import pageTitle from '@/components/common/pageTitle.vue'
import infoCard from '@/components/common/infoCard.vue'
const infoCardProps = [
    {
        title: '中国太平 | 外包 | 前端开发',
        subtitle: '上海复深蓝软件股份有限公司',
        subtitlelink: 'https://www.fulan.com.cn/',
        time: '2025.6-至今'
    },
    {
        title: '银联数据 | 外包 | 前端开发',
        subtitle: '上海博曙信息科技有限公司',
        subtitlelink: 'https://www.fulan.com.cn/',
        time: '2022.2-2025.4'
    },
    {
        title: 'ApiCloud | 甲方 | 前端开发',
        subtitle:"柚子(北京)移动技术有限公司",
        disabled:true,
        time: '2018.9-2021.12'
    },
]
</script>