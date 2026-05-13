<template>
    <el-button v-for="item in mhxyMenu" :key="item.path" @click="routerChange(item)">
        {{ item.text }}
    </el-button>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { mhxyMenu } from '@/config/menu';
defineOptions({
    name: 'mhxyIndex'
})
const router = useRouter()
const routerChange = (item) => {
    router.push(item.path)
}
</script>