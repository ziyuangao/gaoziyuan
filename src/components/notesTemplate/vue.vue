<template>
  <div>
    <el-collapse v-model="activeName" accordion class="collapse-content" >
      <el-collapse-item v-for="item in list" :key="item.id" :title="item.title" :name="item.id">
        <div v-html="item.html"></div>
        <RouterLink v-if="item.path" :to="item.path" >体验一下</RouterLink>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
export default {
  setup() {
    const list = reactive([
      {
        id: 1, title: '说一个调试bug时遇到的一个离谱问题', path: '', html: `测试提出一个bug，页面A下一页跳到页面B后，返回上一页，某些原本存在的控制逻辑失效了，
        我拿到这个bug反馈后，寻思这不就是初始化可能没控制到，导致原本的代码没走么，找一找页面A初始化逻辑应该就可以了。</br>当我去找页面A代码时，明确找到初始化控制表单
        展示的部分，业务写的很详细，注释什么的都有，代码很长，初始化生效了，没有问题，可是为什么从下一页到上一页会出问题呢？我就继续找原因，会不会是返回的时候字段或者传参有问题，
        我就去查一下两个页面之间传参是不是一致，控制台打印数据，emmm也正常，没有问题，这就头大了，这数据都没问题，到底是出在哪，最笨的办法，从上一页按钮开始，不断打印数据，
        查看接口返回。我了个去，我发现，上一页的逻辑不是返回上一个路由，而是去到新路由，新路由是公共组件，再从公共组件的动态组件到一个新的路由去，新的路由不是页面A</br>
        新路由不是页面A，我当时惊掉大牙，下楼抽了两只烟都没想明白为啥要到新页面去。找到问题了就好处理了，新页面没有表单控制的逻辑，加上之后正常跑，可是，这么写对么？`
      },
      {
        id: 2, title:'行盒截断',path:"/infiniteScroll",html:`英文文字换行时保证以单词为界线换行，提升样式美感`
      },
      {
        id: 3, title:'星空背景效果',path:"/starrySky",html:`使用SASS，通过设置box-shadow来实现小星星效果`
      },
      {
        id: 4, title:'自定义指令v-slide-in',path:"/slidein",html:`封装自定义指令`
      },
    ])
    let activeName =  ref("");
    return { list,activeName }
  }
}
</script>
<style scoped>
.collapse-content {
  background: #17191a;
  color: #666666;
}

.collapse-content /deep/ .el-collapse-item__header,
.collapse-content /deep/ .el-collapse-item__content {
  padding: 0 12px;
  box-sizing: border-box;
}
</style>