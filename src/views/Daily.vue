<template>
  <div class="daily">
    <menu-list />
    <ul class="dailyTemplate">
      <list-item v-for="(item,index) in state.list" :key="index" :data="item" class="list-item" ></list-item>
    </ul>
  </div>
</template>

<script>
import { reactive } from 'vue'
import listItem from "../components/common/listItem.vue"
import menuList from '../components/common/menuList.vue'
export default {
  components:{
    listItem,menuList
  },
  setup(){
    const state = reactive({
      list:[
        { src:'http://gaoziyuan.oss-cn-beijing.aliyuncs.com/img/202208060214.jpg',title:'雨后闷热,桃花潭公园中鱼一尾,芜湖~',time:'2022年08月06日 02:14',path:'/pageDetail',id:3,type:'fish'},
        { src:'http://gaoziyuan.oss-cn-beijing.aliyuncs.com/img/7.30.jpg',title:'凌晨凉爽,桃花潭公园中鱼一尾,芜湖~',time:'2022年07月30日 04:40',path:'/pageDetail',id:2,type:'fish'},
        { src:'http://gaoziyuan.oss-cn-beijing.aliyuncs.com/img/7.8.jpg',title:'初夏闷热,浐河A5半岛西侧中鱼一尾,芜湖~',time:'2022年07月08日 22:23',path:'/pageDetail',id:1,type:'fish'},
      ]
    })
    return {state};
  }
}
</script>
<style scoped>
.daily{
  background:#FAFAFA;
  padding-top: 80px;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
  box-sizing: border-box;
  background: rgb(250, 249, 222);
}
.dailyTemplate{
  max-width: 1200px;
  margin: 0 auto;
  box-sizing: border-box;
}
.daily /deep/ .menuList .el-button{
  color: #606266;
}
.daily /deep/ .menuList .el-button:hover{
  color:#409EFF;
}
.list-item{
  margin-bottom: 20px;
}
</style>
