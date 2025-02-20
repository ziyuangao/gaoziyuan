<template>
    <div class="banner">
        <div class="pcBanner">
            <div class="bannerText">
                <p>{{ state.bannerTitleZh }}</p>
                <p>{{ state.bannerTitleEn }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from 'vue';
export default {
    setup(){
        const state = reactive({
            bannerTitleZh:'故事要美必须藏着真话',
            bannerTitleEn:'For a story to be beautiful, it must conceal the truth.'
        })
        return { state }
    }
}
</script>


<style scoped>
.pcBanner{
    width: 100%;
    height: 768px;
    background: url('http://gaoziyuan.oss-cn-beijing.aliyuncs.com/img/pc-banner-bg.jpg') no-repeat 100% 90%;
    background-size: 100%;
}
.pcBanner .bannerText{
    position: absolute;
    left: 6%;
    top: 520px;
    font-weight: bold;
    color: #fff;
    font-size: 24px;
    line-height: 30px;
    letter-spacing: 5px;
}
 .pcBanner .bannerText p{
    mix-blend-mode: difference; /* 使用差值混合模式 */
}
.pcBanner .bannerText p:nth-of-type(2){
    font-size: 1.2rem;
    margin-top: 2.2rem;
    letter-spacing: 0;
}
</style>