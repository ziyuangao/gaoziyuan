<template>
    <page-title>
        <template #image>
            <el-image :src="user" fit="contain"></el-image>
        </template>
        <div>个人简介</div>
    </page-title>
    <article>
        2018年9月23日至今，持续深耕于前端开发。 习惯与逻辑为伴，常为一个有趣的想法彻夜编码。
        我的方式是规划、剥离、构建——用务实和精简，掌控从需求到上线的全流程。 技术上扎根 Vue
        生态，擅长用工具解决问题：例如将本网站拆解为高内聚的乐高模块，或引入 AI 重构工作流，
        先定位宏观问题，再实施精准修复。
    </article>
</template>


<script setup>
import pageTitle from '@/components/common/pageTitle.vue'
import user from '@/assets/pagetitle/user.png'
defineOptions({
    components: {
        pageTitle
    },
    name: 'BriefIntroduction',
})
</script>