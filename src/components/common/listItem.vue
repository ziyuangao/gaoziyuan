<template>
  <div class="list-item" @click="navigateTo(data)">
    <!-- 页面结构 左右 左侧是一张图片 大概200*200 右侧 分上下  上面是标题 下面是时间和描述（描述可不填） -->
    <el-image :src="data.src" class="list-item-img"></el-image>
    <div class="list-item-info">
      <p class="list-item-info-title" v-text="data.title"></p>
      <p class="list-item-info-time" v-text="data.time"></p>
    </div>
  </div>
</template>
<script>
import { useRouter } from 'vue-router'
export default {
  props: {
    data: {
      type: Object
    }
  },
  setup() {
    const route = useRouter();
    const navigateTo = (item) => {
      if (item.path) route.push({
        path: item.path,
        query: {
          type: item.type,
          id: item.id
        }
      })

    }
    return { navigateTo }
  }

}
</script>
<style scoped>
.list-item {
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-radius: 8px;
  box-sizing: border-box;
}

.list-item-img {
  width: 160px;
  height: 160px;
  margin-right: 100px;
}

.list-item-info {
  flex: 1;
  line-height: 60px;
  color: #b1b3b8;
}

.list-item-info-title {
  font-size: 24px;
  font-weight: 500;
  color: #303133;
}</style>