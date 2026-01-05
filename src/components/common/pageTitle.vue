<template>
  <div class="pagetitle">
    <!-- 左侧 image 区域 -->
    <div v-if="$slots.image" class="pagetitle-image">
      <slot name="image" />
    </div>
    
    <!-- title 区域（默认插槽） -->
    <h1 class="pagetitle-title">
      <slot />
    </h1>
  </div>
</template>

<script setup>
// 不需要定义 props，直接使用插槽
</script>

<style scoped>
.pagetitle {
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #E4E7ED;
  box-sizing: border-box;
  line-height: 36px;
  height: 36px;
  margin: 12px 0;
}

.pagetitle-image {
  margin-right: 8px;
  height: 20px;
  width: 20px;
}

.pagetitle-title {
  font-size: 20px;
  font-weight: bold;
  line-height: 1;
  color: #409EFF;
}
</style>