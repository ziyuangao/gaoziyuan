<template>
    <div :class="[{'scroll_down':scrollStatus < 0,'scroll_up':scrollStatus > 0},'demo_content']" >
        <div class="first_one demo_item">
            <img :src="imgConfig.imgList[imgConfig.first].src" alt=""  />
        </div>
        <div  class="second_one demo_item">
            <img :src="imgConfig.imgList[imgConfig.second].src" alt="" />
        </div>
        <div class="last_one demo_item">
            <img :src="imgConfig.imgList[imgConfig.last].src" alt=""  />
        </div>
    </div>
</template>

<script>
import { reactive,onMounted,ref,computed } from 'vue';
export default {
    setup(){
        let scrollStatus = ref(0);
        let isScrolling = ref(false);
        const imgConfig = reactive({
            second:0,
            first:computed(()=>{
                return imgConfig.second - 1 <  0 ? imgConfig.imgList.length  - 1 : imgConfig.second - 1
            }),
            last:computed(()=>{
                return imgConfig.second + 1 > imgConfig.imgList.length - 1 ? 0 : imgConfig.second + 1
            }),
            imgList:[
                {id:'1',src:"https://gaoziyuan.oss-cn-beijing.aliyuncs.com/img/BanffEvergreens_EN-AU12780032283_1920x1080.jpg"},
                {id:'2',src:"https://gaoziyuan.oss-cn-beijing.aliyuncs.com/img/BrazilianPine_EN-AU10074166204_1920x1080.jpg"},
                {id:'3',src:"https://gaoziyuan.oss-cn-beijing.aliyuncs.com/img/CommonPipistrelle_EN-AU7421359791_1920x1080.jpg"},
                {id:'4',src:"https://gaoziyuan.oss-cn-beijing.aliyuncs.com/img/Dongjiang_ZH-CN10434068279_1920x1080.jpg"},
                {id:'5',src:"https://gaoziyuan.oss-cn-beijing.aliyuncs.com/img/DulangIsland_ZH-CN7669462147_1920x1080.jpg"}
            ]
        })
        // 监听开始滚动
        const linsterWheel = (e) =>{
            if(isScrolling.value) return 
            if(!e.deltaY) return //如果不存在滚动值 如果正在滚动 结束函数
            scrollStatus.value = e.deltaY;//记录滚动值
            isScrolling.value = true;
            if(scrollStatus.value > 0){//向下混动
                // 确认当前图片下标
                imgConfig.second = imgConfig.second + 1 > imgConfig.imgList.length - 1 ? 0 : imgConfig.second + 1
            }else{//向上滚动
                imgConfig.second = imgConfig.second - 1 <  0 ? imgConfig.imgList.length - 1 : imgConfig.second - 1
                // 确认当前图片下标
            }
        }
        // 监听动画结束
        const transitionEnd = ()=>{
            isScrolling.value = false;
            scrollStatus.value = 0;
        }
        onMounted(()=>{
            window.addEventListener('wheel',linsterWheel);
            document.querySelector('.demo_content').addEventListener('transitionend',transitionEnd);
        })
        return {imgConfig,scrollStatus,isScrolling}
    }
}
</script>
<style scoped>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.demo_content{
    width: 100%;
    height: 100vh;
    position: relative;
    /* 三张图片是重叠在一起的 */
    overflow: hidden;
}
.demo_item{
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition: 1s ease-in-out;
}
.demo_item img{
    position: absolute;
    width: 100%;
    height: 100vh;
    /* 图片覆盖整个页面 */
    object-fit: cover;
    transition: 1s ease-in-out;
}
/* 第一个图和最后一个图一定是覆盖当前图片的 */
.first_one,.last_one{
    z-index: 1;
    height: 0;
}
.last_one{
    bottom: 0;
}
/* 图片是固定在底边的 上拉时效果合理 */
.last_one img{
    bottom: 0;
    transform: translateY(10%);
}
.last_first img{
    transform: translateY(-10%);
}
.scroll_up .first_one{
    height: 100%;
}
.scroll_down .last_one{
    height: 100%;
}
.scroll_down .second_one img{
    transform: translateY(-10%);
}
.scroll_down .last_one img{
    transform: translateY(0%);
}
.scroll_up .first_one img{
    transform: translateY(0%);
}
.scroll_up .second_one img{
    transform: translateY(10%);
}
</style>