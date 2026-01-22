<template>
<div class="common-layout">
    <el-container>
        <el-header>LOL英雄查询 version {{heroData.version}}-合计英雄{{ heroData.hero.length }}位-更新时间{{ heroData.fileTime }}</el-header>
        <el-container>
            <el-aside class="aside-left">
                <div class="aside-input"><el-input v-model="keyword" placeholder="关键词" clearable /></div>
                <el-space direction="vertical">
                    <el-button type="primary" @click="setType('')" >全英雄</el-button>
                    <el-button type="primary" @click="setType(k)" v-for="(i,k) in typeMap" :key="k"  >{{i}}</el-button>
                </el-space>
            </el-aside>
            <el-main >
                <div class="root-view-header">
                    <div v-for="i in dataPool" :key="i.heroId" class="hero-item">
                        <el-button type="success">{{i.name}}</el-button>
                    </div>
                </div>
                <div class="root-view-footer">
                    <div >在当前类目下,随机{{num}}个英雄
                        <el-button color="#626aef" size="default" :dark="true" @click="randomHero">开始</el-button>
                    </div>
                    <div class="root-view-footer-btns">
                        <el-button-group size="default">
                            <el-button type="primary" @click="num = 1" >1</el-button>
                            <el-button type="primary" @click="num = 3" >3</el-button>
                            <el-button type="primary" @click="num = 5" >5</el-button>
                            <el-button type="primary" @click="num = 10" >10</el-button>
                        </el-button-group>
                    </div>
                    <div>
                        <el-button v-for="i in result" :key="i.heroId" >{{i.name}}</el-button>
                    </div>
                </div>
            </el-main>
        </el-container>
    </el-container>
</div>
</template>

<script setup>
import { ref,computed,onMounted,reactive } from 'vue';
let heroData = reactive({});
const dataPool = computed(() => {
    // 默认情况
    if(!currentType.value && !keyword.value){
        return heroData.hero
    } else {
        if(!currentType.value){// 只搜索了 类型
            return heroData.hero.filter(item=>item.keywords.includes(keyword.value))
        } else if (!keyword.value){// 只搜索了 名字
            return heroData.hero.filter(item=>item.roles.includes(currentType.value))
        } else {//名字 + 类型
            if(!currentType.value){//在全英雄类目下搜索
                return heroData.hero.filter(item=>item.roles.includes(currentType.value))
            } else {
                return heroData.hero.filter(item=>item.roles.includes(currentType.value) && item.keywords.includes(keyword.value))
            }
        }
    }
})
const typeMap = {
    mage:"法师",
    support:"辅助",
    marksman:"射手",
    fighter:"战士",
    assassin:"刺客",
    tank:"坦克",
}
const setType = (k)=>{
    currentType.value = k;
    keyword.value = "";
    result.value = [];
}
let currentType = ref("");
let keyword = ref("");
let num = ref(1);
const getRandomOne = (arr)=>{
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}
let result = ref([]);
const randomHero = ()=>{
    result.value = [];//设置随机结果
    for (let index = 0; index < num.value; index++) {
        // 从数组中随机获取一项
        const randomOne = getRandomOne(dataPool.value);
        // 如果存在这个数据  那么重新随机
        if(result.value.includes(randomOne)){
            index--;
        } else {//添加结果
            result.value.push(randomOne);
        }
    }
}
const getHeroData = async ()=>{
    await fetch("https://game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js").then(res=>{
        if (!res.ok) {
            throw new Error('网络响应不正常');
        }
        return res.json();
    }).then(res=>{
        Object.assign(heroData,res)
    })
    .catch(()=>{
        this.$message.error('获取英雄列表失败');
    })
}

onMounted(()=>{
    getHeroData()
})

</script>

<style scoped lang="scss">
.common-layout {
    padding: 16px;
    box-sizing: border-box;

    .el-header {
        font-size: 24px;
    }
    .aside-left{
        padding: 16px 0;
        box-sizing: border-box;
        width: 100px;
        text-align: center;
        .aside-input{
            margin-bottom: 12px;
        }
    }
    .root-view-header{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-flow: row wrap;
        .hero-item{
            margin: 6px;;
        }
    }
    .root-view-footer{
        margin-top: 20px;
        font-size: 18px;
        .root-view-footer-btns{
            margin: 10px 0;
        }
    }
}
</style>