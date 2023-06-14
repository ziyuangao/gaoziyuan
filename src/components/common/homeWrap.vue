<template>
    <div class="homeWrap">
        <div class="content">
            <user-info />
            <div class="printer" v-html="state.introduceCopy" ></div>
        </div>
    </div>
</template>

<script>
import userInfo from './userInfo.vue';
import { onMounted, reactive } from 'vue';
export default {
    components:{
        userInfo
    },
    setup(){
        const state = reactive({
            introduce:`高梓原</br>出生于1993年10月28日,汉族</br>2016年毕业于华北水利水电大学</br>2018年开始从事前端开发,目前就职上海。</br>
            一个典型的矛盾综合体</br>即浪漫又现实,即狂妄又谦虚,即疯狂又冷静。</br>`,
            introduceCopy:'',
            timer:null
        })
        const printer = ()=>{
            state.timer = setInterval(()=>{
                if(state.introduceCopy.length - 1 >=  state.introduce.length){
                    clearInterval(state.timer);
                    state.timer = null;
                    state.introduceCopy = state.introduce;
                }else{
                    state.introduceCopy = state.introduce.substring(0,state.introduceCopy.length)+'_'
                }
            },100)
        }
        onMounted(()=>{
            printer()
        })
        return {state}
    }
}
</script>
<style scoped>
.homeWrap{
    width:100%;
    background:rgba(233,233,233,.5);
    padding:1rem 0;
}
.homeWrap .content{
    border-radius:16px;
    overflow:hidden;
    padding:1rem;
    width:1200px;
    background:#fff;
    margin:0 auto;
    display:flex;
    justify-content:space-around;
    align-items:center;
}
.contentForMobile{
    width: 96%;
    margin: 0 auto;
    background:#fff;
    display:flex;
    justify-content:space-around;
    align-items:center;
}
.printer{
    flex-basis:40%;
    font-size:24px;
    line-height:40px;
}
.printerForMobile{
    flex: 1;
    margin-left: .4rem;
    font-size: .8rem;
    line-height: 1rem;
}
</style>