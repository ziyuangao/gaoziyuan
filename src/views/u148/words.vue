<template>
    <div class="container">
        <el-image :src="imgSrc" alt="" :loading="loading" preview-src-list>
            <template #error>
            <div class="image-slot">
                <el-icon><icon-picture /></el-icon>
            </div>
            </template>
        </el-image>
        <el-button @click="getWords" size="large" type="primary" block>换一个</el-button>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
// fetch对象
const imgSrc = ref('')
const loading = ref(false)
const getWords = () => {
    loading.value = true
    fetch('https://nekos.best/api/v2/neko')
        .then(response => response.json())
        .then(json => {
            imgSrc.value = json.results[0].url
            loading.value = false
        })
    .catch(error => console.log('error', error));
}

onMounted(() => {
    getWords()
})
</script>


<style lang="css" scoped>
.container {
    width: 500px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
        width: 500px;
    }
}
</style>