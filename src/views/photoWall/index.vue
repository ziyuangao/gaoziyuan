<template>
  <div class="waterfall-container">
    <!-- 固定4列 -->
    <div class="waterfall-column" v-for="col in 4" :key="col">
      <div 
        v-for="photo in getColumnPhotos(col - 1)" 
        :key="photo.id"
        class="photo-item"
        ref="photoRefs"
      >
        <el-image
          class="photo-image"
          :src="photo.thumbnail"
          fit="cover"
          :preview-src-list="previewUrl(photo)"
          loading="lazy"
          hide-on-click-modal
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted,nextTick } from 'vue'
import { ElImage } from 'element-plus'
import { ossUrl,photosFolder } from '@/config/resources'
import { useDeviceDetection } from '@/assets/useDeviceDetection.js'

const { isMobile } = useDeviceDetection()

// ========== 配置常量 ==========
const COLUMN_COUNT = 4      // 固定4列
const ITEM_HEIGHT = isMobile.value ? 100 : 350     // 图片高度
const LAZY_OFFSET = 100     // 懒加载交叉距离

// ========== 模拟数据 ==========
// 296
const photos = ref(Array.from({ length: 296 }, (_, i) => ({
  id: i + 1,
  thumbnail: `${ossUrl}${photosFolder}${i+1}.jpg?x-oss-process=image/resize,w_350,h_350,m_fill`,
  loaded: false
})))

// ========== 瀑布流布局 ==========
const columns = ref([]) // 存储每列的图片

// 初始化瀑布流布局（只执行一次）
const initWaterfall = () => {
  // 初始化4个空列
  columns.value = Array.from({ length: COLUMN_COUNT }, () => [])
  
  // 每列的高度记录
  const columnHeights = new Array(COLUMN_COUNT).fill(0)
  
  // 分配图片到最短列
  photos.value.forEach((photo, index) => {
    // 找到最短的列
    let shortestCol = 0
    for (let i = 1; i < COLUMN_COUNT; i++) {
      if (columnHeights[i] < columnHeights[shortestCol]) {
        shortestCol = i
      }
    }
    
    // 将图片添加到最短列
    columns.value[shortestCol].push({
      ...photo,
    })
    
    // 更新列高度
    columnHeights[shortestCol] += ITEM_HEIGHT + 15 // 15为间距
  })
}

// 获取指定列的图片
const getColumnPhotos = (colIndex) => {
  return columns.value[colIndex] || []
}

// ========== 懒加载实现 ==========
let observer = null
const photoRefs = ref([])

// 初始化Intersection Observer
const initLazyLoad = () => {

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const photoElement = entry.target
        const photoId = photoElement.dataset.id
        
        // 找到对应的图片数据
        const photo = photos.value.find(p => p.id == photoId)
        if (photo && !photo.loaded) {
          photo.loaded = true
          // 停止观察
          observer.unobserve(photoElement)
        }
      }
    })
  }, {
    rootMargin: `${LAZY_OFFSET}px 0px` // 上下交叉100px触发
  })
}

// 开始观察所有图片元素
const startObserving = () => {
  if (!observer) return
  
  nextTick(() => {
    photoRefs.value.forEach(element => {
      if (element) {
        observer.observe(element)
      }
    })
  })
}

// ========== 生命周期 ==========
onMounted(() => {
  // 1. 初始化瀑布流布局
  initWaterfall()
  
  // 2. 初始化懒加载
  initLazyLoad()
  
  // 3. 开始观察
  startObserving()
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})

const previewUrl = ((photo)=>{
  return [photo.thumbnail.split('?')[0]]
})
</script>

<style scoped>

.waterfall-container {
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  gap: 15px;
  background: #f5f7fa;
}

/* 列样式 */
.waterfall-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* 图片项 */
.photo-item {
  width: 100%;
  height: 350px;
  border-radius: 8px;
  overflow: hidden;
  background: #e0e0e0;
  transition: all 0.3s ease;
  cursor: pointer;
}

/* Element Plus 图片样式 */
.photo-image {
  width: 100%;
  height: 100%;
  display: block;
}

</style>