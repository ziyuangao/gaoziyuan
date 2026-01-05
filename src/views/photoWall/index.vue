<template>
  <div class="photo-wall">
    <el-image
      v-for="item in loadedPhotos"
      :key="item.id"
      class="photo-item"
      :src="item.thumbnail"
      fit="cover"
      :preview-src-list="[item.url]"
      loading="lazy"
      hide-on-click-modal
    />
    
    <!-- 加载状态提示 -->
    <div v-if="loading" class="loading-tip">
      正在加载中...
    </div>
    <div v-if="noMore" class="no-more-tip">
      已经到底了
    </div>
  </div>
  <!-- 滚动检测哨兵 -->
  <div ref="sentinelRef" class="sentinel"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { ElImage } from 'element-plus'
import { ossUrl, photosFolder } from '@/config/resources'
import { useDeviceDetection } from '@/assets/useDeviceDetection.js'

const { screenWidth } = useDeviceDetection()

const MAXNUMBER = 296; // 图片总数
const LOAD_COUNT = 10; // 每次加载图片数量
const ITEM_HEIGHT = screenWidth.value < 768 ? 100 : 350;  // 移动端时设置图片宽高
const LOAD_THRESHOLD = 100; // 滚动触发的阈值(px)
const INITIAL_LOAD_COUNT = 3; // 初始加载次数，用于填满屏幕

const photos = ref([]); // 所有图片数据
const loadedPhotos = ref([]); // 已加载显示的图片
const currentIndex = ref(0); // 当前加载到的索引
const loading = ref(false); // 加载状态
const noMore = ref(false); // 是否没有更多图片
const sentinelRef = ref(null); // IntersectionObserver 哨兵元素
const observer = ref(null); // IntersectionObserver 实例

// ========== 准备全部数据 ==========
const initPhotosData = () => {
  const photoList = [];

  for (let i = 0; i < MAXNUMBER; i++) {
    photoList.push({
      id: i + 1,
      thumbnail: `${ossUrl}${photosFolder}${i + 1}.jpg?x-oss-process=image/resize,w_${ITEM_HEIGHT},h_${ITEM_HEIGHT},m_fill`,
      url: `${ossUrl}${photosFolder}${i + 1}.jpg`,
    })
  }

  photos.value = photoList.reverse();
}

// ========== 加载图片数据 ==========
const loadData = () => {
  // 如果正在加载或没有更多数据，直接返回
  if (loading.value || noMore.value) {
    return false;
  }
  
  const startIdx = currentIndex.value * LOAD_COUNT;
  
  // 检查是否还有数据可加载
  if (startIdx >= photos.value.length) {
    noMore.value = true;
    return false;
  }
  
  loading.value = true;
  
  const endIdx = Math.min(startIdx + LOAD_COUNT, photos.value.length);
  const newPhotos = photos.value.slice(startIdx, endIdx);
  
  // 添加到已加载列表
  loadedPhotos.value.push(...newPhotos);
  currentIndex.value++;
  
  // 如果是模拟加载，可以保留setTimeout，实际项目中根据图片加载完成事件来设置
  // 这里假设图片加载很快，直接设置加载完成
  loading.value = false;
  
  // 检查是否加载完毕
  if (currentIndex.value * LOAD_COUNT >= photos.value.length) {
    noMore.value = true;
  }
  
  return true;
}

// ========== 判断是否充满可视区 ==========
const isViewportFilled = () => {
  const totalHeight = document.documentElement.scrollHeight;
  const viewportHeight = window.innerHeight;
  
  // 如果页面总高度 < 可视区域高度，说明没填满
  return totalHeight >= viewportHeight;
}
// ========== 初始化 IntersectionObserver ==========
const initIntersectionObserver = () => {
  if (observer.value) {
    observer.value.disconnect();
  }
  
  observer.value = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !loading.value && !noMore.value) {
          loadData();
        }
      });
    },
    {
      root: null,
      rootMargin: `${LOAD_THRESHOLD}px`,
      threshold: 0.1
    }
  );
  
  if (sentinelRef.value) {
    observer.value.observe(sentinelRef.value);
  }
}

// ========== 初始化函数 ==========
const init = async () => {
  initPhotosData();
  
  // 首次加载一批图片
  loadData();
  
  // 等待DOM渲染
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // 继续加载直到填满屏幕（最多加载3次）
  let loadAttempts = 0;
  const maxAttempts = INITIAL_LOAD_COUNT;
  
  while (loadAttempts < maxAttempts && !isViewportFilled() && !noMore.value) {
    if (!loading.value) {
      loadData();
      loadAttempts++;
      // 等待图片加载和DOM渲染
      await new Promise(resolve => setTimeout(resolve, 150));
    }
  }
  
  // 初始化 IntersectionObserver
  initIntersectionObserver();
}

// ========== 生命周期 ==========
onMounted(() => {
  init();
});

onUnmounted(() => {
  if (observer.value) {
    observer.value.disconnect();
  }
});
</script>

<style scoped>
.photo-wall {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(4, 1fr);
  padding: 20px;
  background: #f5f7fa;
  min-height: 100vh;
}

.photo-item {
  border-radius: 8px;
  cursor: pointer;
}

.sentinel {
  height: 1px;
  width: 100%;
  pointer-events: none;
}

.loading-tip {
  grid-column: 1 / -1;
  text-align: center;
  padding: 20px;
  color: #666;
}

.no-more-tip {
  grid-column: 1 / -1;
  text-align: center;
  padding: 30px;
  color: #999;
  font-size: 14px;
}
</style>