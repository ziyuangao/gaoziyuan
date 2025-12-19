<template>
  <div 
    class="waterfall-photo"
    :style="{ width: width + 'px', height: height + 'px' }"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <el-image
      :src="photo.thumbnail"
      :preview-src-list="[photo.original]"
      fit="cover"
      loading="lazy"
      class="photo-image"
      :class="{ 'hovered': isHovered }"
      hide-on-click-modal
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElImage } from 'element-plus'

const props = defineProps({
  photo: Object,
  width: Number,
  height: Number
})

const isHovered = ref(false)
</script>

<style scoped>
.waterfall-photo {
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.photo-image {
  width: 100%;
  height: 100%;
  display: block;
  transition: transform 0.4s ease;
}

.photo-image.hovered {
  transform: scale(1.03);
}

.waterfall-photo:hover {
  box-shadow: 
    0 12px 28px rgba(0, 0, 0, 0.15),
    0 8px 20px rgba(0, 0, 0, 0.12);
  transform: translateY(-4px);
}

/* 加载状态 */
.photo-image::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  z-index: -1;
}
</style>