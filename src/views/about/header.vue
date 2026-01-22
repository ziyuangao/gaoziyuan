<template>
    <section class="content-header">
        <el-image :src="profilePhoto" class="profile-photo"></el-image>
        <h1 class="header-name">高梓原</h1>
        <p class="header-title">前端开发</p>
        <address class="header-contact">ziyuan_gao@163.com</address>
    </section>
</template>


<script setup>
import profilePhoto from '@/assets/profile-photo.png'
defineOptions({
    name: 'HeaderInfo'
})
</script>

<style scoped lang="scss">
.content-header {
    text-align: center;
    margin-bottom: 20px;
}

.profile-photo {
    transition: all 0.3s ease;
    border-radius: 50%;
    width: 200px;
    height: 200px;
    border: 3px solid #ffffff;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    object-fit: cover;
}

.profile-photo:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 40px rgba(23, 23, 23, 0.6);
}

.header-name {
    font-size: 36px;
    font-weight: bold;
    margin: 24px 0 8px;
    color: #303133;
}

.header-title {
    font-size: 16px;
    color: #606266;
    margin: 0 0 8px;
}

.header-contact {
    font-size: 14px;
    color: #909399;
    font-style: normal;
}
</style>