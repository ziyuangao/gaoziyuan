<template>
    <section class="section education">
        <page-title>
            <template #image>
                <el-image :src="mortarboard" fit="contain"></el-image>
            </template>
            <div>教育背景</div>
        </page-title>
        <infoCard :data="infoCardProps" />
    </section>
</template>

<script setup>
import mortarboard from '@/assets/pagetitle/mortarboard.png'
import pageTitle from '@/components/common/pageTitle.vue'
import infoCard from '@/components/common/infoCard.vue'
defineOptions({
    name:'EducationInfo',
})
const infoCardProps = [
    {
        title: '建筑工程技术 | 函授 | 专科',
        subtitle: '华北水利水电大学',
        subtitlelink: 'https://www.ncwu.edu.cn/',
        time: '2014-2016'
    },
    {
        title: '软件工程 | 开放教育 | 本科',
        subtitle: '国家开放大学',
        subtitlelink: 'https://www.ouchn.edu.cn/',
        time: '2025-2027'
    }
]
</script>