<template>
    <div class="deepseek">
        <p>这是一个使用 DeepSeek API 的示例页面。</p>
        <p>请查看控制台以获取 API 响应。</p>
        <el-input v-model="userInput" >
            <template #append>
                    <el-button :icon="Search" @click="handleClick" />
            </template>
        </el-input>
    </div>
</template>

<script setup>
import OpenAI from "openai";
import { ref } from "vue";
import { Search } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/userStore'
const userStore = useUserStore()

const userInput = ref('')

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: userStore.DEEPSEEK_ENCKEY,
    dangerouslyAllowBrowser:true,
});

const handleClick = async () => {
    const completion = await openai.chat.completions.create({
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: userInput.value },
        ],
        model: "deepseek-chat",
    });
    console.log(completion.choices[0].message.content,'content');
}

</script>

<style scoped>



</style>