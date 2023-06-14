<template>
  <div class="pageDetail">
      <div v-html="state.page.title"></div>
      <div v-html="state.page.content"></div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { onMounted, reactive } from 'vue';
export default {
  setup(){
    const state = reactive({
      page:{}
    })
    const route = useRoute();
    /**
     * route 接收两个参数
     *  type 文章类型  用来判断使用那个数据池
     *  id   文章ID    用来判断具体是那个文章
     */
    const getDataPool = (config)=>{
      if(config.type){
        let dataArr = [];
        dataArr = require(`../dataPool/${config.type}.json`)
        dataArr.forEach(item=>{
          if(item.id == config.id){
              state.page = item
          }
        })
      }else{
        return {};
      }
    }
    onMounted(() => {
      if(route.query){
        getDataPool(route.query);
      } 
    })
    return {state}
  }
};
</script>