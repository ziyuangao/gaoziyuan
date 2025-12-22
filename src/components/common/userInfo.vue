<template>
    <div>
        <!-- 使用 Element Plus 卡片组件，点击时跳转到关于页面 -->
        <el-card shadow="always" @click="$router.push('/about')">
            <!-- 轮播图组件，设置高度为360px -->
            <el-carousel height="360px" class="carouselBox" :autoplay="state.carouselConfig.autoplay"
                :indicator-position="state.carouselConfig.indicatorPosition">
                <!-- 循环渲染轮播图项目 -->
                <el-carousel-item v-for="(item, index) in state.avatarArr" :key="index">
                    <img :src="item.src" />
                </el-carousel-item>
            </el-carousel>
        </el-card>
    </div>
</template>

<script>
import { reactive } from 'vue'; // 导入 Vue 的响应式 API
import { ossUrl,avatarFolder } from '../../config/resources';
export default {
    setup() {
        // 创建响应式状态对象
        const state = reactive({
            // 轮播图配置
            carouselConfig: {
                autoplay: true,         // 是否自动播放
                indicatorPosition: 'none'// 指示器位置，设置为none表示不显示
            },
            // 轮播图图片数组
            avatarArr: [
                // 存储轮播图片的信息，包含id和图片地址
                { id: 1, src: `${ossUrl}${avatarFolder}ai1.jpg` },
                { id: 2, src: `${ossUrl}${avatarFolder}ai2.jfif` },
                { id: 3, src: `${ossUrl}${avatarFolder}avatar1.jpg` },
                { id: 4, src: `${ossUrl}${avatarFolder}avatar2.jpg` },
                { id: 5, src: `${ossUrl}${avatarFolder}avatar6.jpg` },
            ]
        })
        return { state } // 返回响应式状态供模板使用
    }
}
</script>

<style scoped>
/* PC端轮播图容器样式 */
.carouselBox {
    width: 270px;
    height: 360px;
    cursor: pointer;
}

/* 移动端轮播图容器样式 */
.carouselBoxForMobile {
    width: 9rem;
    height: 12rem;
}

/* 轮播图项目样式 */
.carouselBox .el-carousel-item {
    width: 100%;
    height: 100%;
}

/* PC端轮播图图片样式 */
.carouselBox img {
    width: 100%;
    height: 100%;
}

/* 移动端轮播图图片样式 */
.carouselBoxForMobile img {
    width: 100%;
    height: 100%;
}
</style>