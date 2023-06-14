<template>
    <div>
        <el-card shadow="always" @click="$router.push('/about')">
            <el-carousel height="360px" 
            class="carouselBox" 
            :autoplay="state.carouselConfig.autoplay" 
            :indicator-position="state.carouselConfig.indicatorPosition">
                <el-carousel-item v-for="(item,index) in state.avatarArr" :key="index">
                   <img :src="item.src" />
                </el-carousel-item>
            </el-carousel>
        </el-card>
    </div>
</template>

<script>
import { reactive } from 'vue'
export default{
    setup(){
        const state = reactive({
            carouselConfig:{
                autoplay:false,
                indicatorPosition:'none'
            },
            avatarArr:[
                {id:1,src:"http://gaoziyuan.oss-cn-beijing.aliyuncs.com/img/avatar1.jpg"},
                {id:2,src:"http://gaoziyuan.oss-cn-beijing.aliyuncs.com/img/avatar2.jpg"},
                {id:3,src:"http://gaoziyuan.oss-cn-beijing.aliyuncs.com/img/avatar3.jpg"},
                {id:4,src:"http://gaoziyuan.oss-cn-beijing.aliyuncs.com/img/avatar4.jpg"},
            ]
        })
        return {state}
    }
}
</script>

<style scoped>
.carouselBox{
    width:270px;
    height:360px;
    cursor: pointer;
}
.carouselBoxForMobile{
    width: 9rem;
    height: 12rem;
    
}
.carouselBox .el-carousel-item{
    width:100%;
    height:100%;
}
.carouselBox img{
    width:100%;
    height:100%;
}
.carouselBoxForMobile img{
    width:100%;
    height:100%;
}
</style>