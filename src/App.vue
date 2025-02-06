<template>
  <div class="min1200">
    <router-view />
  </div>
</template>

<script>
export default {
  data(){
    return {
      model:[]
    }
  },
  mounted(){
  }
}
</script>

<style>
.min1200{
  min-width: 1200px;
  font-family: Inter, 'Helvetica Neue', Helvetica, 'PingFang SC',
  'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
</style>