<template>
  <el-container class="notesWrap">
    <menu-list />
    <el-header height="80px" class="note-header">
      当你在凝视深渊的时候，深渊也正在凝视着你
    </el-header>
    <el-container>
      <el-aside width="140px">
        <el-menu
          active-text-color="#409EFF"
          :default-active="state.defaultActive"
        >
          <el-menu-item v-for="(item,index) in state.menuList" :key="index" :disabled="item.disabled" @click="menuItemClick(item)" :index="item.index" >
            <template #title>{{item.title}}</template>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="el-main-notes" >
        <router-view ></router-view>
        <!-- todo 逻辑优化 -->
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import menuList from '../common/menuList.vue'
export default {
  components:{
    menuList
  },
  setup() {
    const router = useRouter();
    const state = reactive({
      defaultActive: "1",
      menuList: [
        {id: 1,title: "原生js",disabled: false,path:'/notes/javaScript',index:'1'},
        {id: 2,title: "jQuery",disabled: true,path:'/notes/jQuery',index:'2'},
        {id: 3,title: "Vue",disabled: false,path:'/notes/vue',index:'3'},
        {id: 4,title: "小程序相关",disabled: true,path:'/notes/miniProgram',index:'4'},
        {id: 4,title: "流水账",disabled: true,path:'/notes/food',index:'5'},
        {id: 4,title: "练手",disabled: false,path:'/notes/test',index:'6'},
      ],
    });
    const menuItemClick = (item)=>{
      router.push(item.path)
    }
    return { state,menuItemClick };
  },
};
</script>

<style scoped>
.notesWrap {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: url('../../assets/note-bg.png') no-repeat center;
  background-size: cover;
}
.notesWrap /deep/ .el-menu{
  background:none;
  border-right: none;
}
.notesWrap /deep/ .el-menu-item{
  font-size: 18px;
  height: 80px;
  line-height: 80px;
  background: none;
  color:#ecf5ff;
}
.note-header{
  text-align: center;
  line-height: 120px;
  font-size: 28px;
  font-weight: 500;
  color: #ecf5ff;
}
</style>