<template>
  <div class="noteTemplate">
    <!-- 笔记页面分为顶部菜单 -->
    <!-- 左侧操作栏 右侧可视区 -->
    <noteWrap />
  </div>
</template>

<script>
import noteWrap from '../components/notesTemplate/index.vue'
export default {
  name:'notesHome',
  components: {
    noteWrap
  }
}
</script>
