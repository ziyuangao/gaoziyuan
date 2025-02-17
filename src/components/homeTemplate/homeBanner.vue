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
            bannerTitleEn:'If a story wants to be beautiful, it must hide this truth.'
        })
        return { state }
    }
}
</script>


<style scoped>
.pcBanner{
    width: 100%;
    height: 620px;
    background: url('http://gaoziyuan.oss-cn-beijing.aliyuncs.com/img/pc-banner-bg.jpg') no-repeat 100% 90%;
    background-size: 100%;
}
.pcBanner .bannerText{
    position: absolute;
    left: 6%;
    top: 420px;
    font-weight: bold;
    color: #DCDCDC;
    font-size: 24px;
    line-height: 30px;
    letter-spacing: 5px;
}
.pcBanner .bannerText p:nth-of-type(2){
    font-size: 18px;
    margin-top: 24px;
    letter-spacing: 0;
}
</style>