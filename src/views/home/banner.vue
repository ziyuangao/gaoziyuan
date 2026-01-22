<template>
    <div class="banner-area">
        <div class="banner-text">
            <p class="banner-text-zh">{{ state.bannerTitleZh }}</p>
            <p class="banner-text-en">{{ state.bannerTitleEn }}</p>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
defineOptions({
    name: 'HomeBanner'
})
const state = reactive({
    bannerTitleZh: '故事要美必须藏着真话',
    bannerTitleEn: 'For a story to be beautiful, it must conceal the truth.'
})
</script>


<style scoped lang="scss">
.banner-area {
    width: 100%;
    height: 768px;
    background: url('https://gaoziyuan.oss-cn-beijing.aliyuncs.com/img/pc-banner-bg.jpg') no-repeat 100% 90%;
    background-size: 100%;

    .banner-text {
        position: absolute;
        left: 6%;
        top: 520px;
        font-weight: bold;
        color: #fff;
        font-size: 24px;
        line-height: 30px;
        letter-spacing: 5px;

        .banner-text-zh,
        .banner-text-en {
            /* 使用差值混合模式 */
            mix-blend-mode: difference;
        }

        .banner-text-en {
            font-size: 1.2rem;
            margin-top: 2.2rem;
            letter-spacing: 0;
        }
    }
}
</style>