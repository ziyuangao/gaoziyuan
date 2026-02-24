<!-- components/RoadReplay.vue -->
<template>
  <div class="road-replay">
    <div id="mapContainer" class="map-container"></div>
    
    <!-- 控制面板 -->
    <div class="control-panel" v-if="showControls">
      <button 
        class="btn btn-primary" 
        @click="startAnimation"
        :disabled="isPlaying"
      >
        开始
      </button>
      <button 
        class="btn" 
        @click="pauseAnimation"
        :disabled="!isPlaying"
      >
        暂停
      </button>
      <button class="btn" @click="stopAnimation">
        结束
      </button>
    </div>
    
    <!-- 当前点位信息 -->
    <div class="info-panel" v-if="currentPoint">
      <h4>{{ currentPoint.name }}</h4>
      <p class="time">{{ currentPoint.info }}</p>
      <p class="event">{{ currentPoint.event }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import AMapLoader from '@amap/amap-jsapi-loader';

const props = defineProps({
  points: {
    type: Array,
    required: true
  },
  apiKey: {
    type: String,
    required: true
  },
  securityJsCode: {
    type: String,
    required: true
  },
  showControls: {
    type: Boolean,
    default: true
  }
});

let map = null;
let marker = null;
let polyline = null;
let passedPolyline = null;

const isPlaying = ref(false);
const currentPoint = ref(null);

// 轨迹点数组
const lineArr = computed(() => props.points.map(p => p.value));

// 初始化地图
onMounted(() => {
  // 设置安全密钥
  window._AMapSecurityConfig = {
    securityJsCode: props.securityJsCode
  };
  
  AMapLoader.load({
    key: props.apiKey,
    version: '2.0',
    plugins: ['AMap.MoveAnimation'] // 加载动画插件
  }).then((AMap) => {
    initMap(AMap);
  }).catch(e => {
    console.error('高德地图加载失败:', e);
  });
});

// 销毁地图
onUnmounted(() => {
  if (marker) {
    marker.stopMove();
  }
  if (map) {
    map.destroy();
  }
});

// 初始化地图
const initMap = (AMap) => {
  // 创建地图实例
  map = new AMap.Map('mapContainer', {
    viewMode: '3D',
    zoom: 8,
    center: props.points[0].value,
  });

  // 创建车辆标记
  marker = new AMap.Marker({
    map: map,
    position: props.points[0].value,
    icon: 'https://a.amap.com/jsapi_demos/static/demo-center-v2/car.png',
    offset: new AMap.Pixel(-13, -26)
  });

  // 绘制完整轨迹线
  polyline = new AMap.Polyline({
    map: map,
    path: lineArr.value,
    strokeColor: '#3366FF',
    strokeWeight: 6,
    strokeStyle: 'solid',
    showDir: true
  });

  // 绘制已走过的轨迹线
  passedPolyline = new AMap.Polyline({
    map: map,
    strokeColor: '#AF5',
    strokeWeight: 6
  });

  // 监听移动事件
  marker.on('moving', (e) => {
    // 更新已走过的轨迹
    passedPolyline.setPath(e.passedPath);
    
    // 更新当前点位信息
    const position = e.target.getPosition();
    updateCurrentPoint(position);
    
    // 地图跟随
    map.setCenter(position, true);
  });

  // 监听移动结束事件
  marker.on('moveend', () => {
    isPlaying.value = false;
    currentPoint.value = props.points[props.points.length - 1];
  });

  // 添加点位标记
  addPointMarkers(AMap);

  // 调整视野
  map.setFitView([polyline]);
  
  // 默认显示起点信息
  currentPoint.value = props.points[0];
};

// 添加点位标记
const addPointMarkers = (AMap) => {
  props.points.forEach((point, index) => {
    let color = '#409EFF';
    let icon = '📍';
    
    switch(point.type) {
      case 'start':
        color = '#67C23A';
        icon = '🚩';
        break;
      case 'end':
        color = '#F56C6C';
        icon = '🏁';
        break;
      case 'overnight':
        color = '#909399';
        icon = '🌙';
        break;
      case 'important':
        color = '#E6A23C';
        icon = '⚠️';
        break;
    }

    // 创建自定义标记
    const markerDiv = document.createElement('div');
    markerDiv.innerHTML = `
      <div style="
        background: ${color};
        color: white;
        padding: 4px 8px;
        border-radius: 20px;
        font-size: 12px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        cursor: pointer;
        white-space: nowrap;
      ">
        <span>${icon}</span>
        ${point.name}
      </div>
    `;

    const pointMarker = new AMap.Marker({
      position: point.value,
      content: markerDiv,
      offset: new AMap.Pixel(-50, -20)
    });

    pointMarker.on('click', () => {
      jumpToPoint(index);
    });

    map.add(pointMarker);
  });
};

// 开始动画（固定0.5倍速）
const startAnimation = () => {
  isPlaying.value = true;
  
  // 设置较慢的动画速度（2000毫秒每段）
  marker.moveAlong(lineArr.value, {
    duration: 2000, // 固定时长，速度较慢
    autoRotation: true,
  });
};

// 暂停动画
const pauseAnimation = () => {
  isPlaying.value = false;
  marker.pauseMove();
};

// 结束动画
const stopAnimation = () => {
  isPlaying.value = false;
  marker.stopMove();
  marker.setPosition(props.points[0].value);
  passedPolyline.setPath([]);
  currentPoint.value = props.points[0];
  map.setCenter(props.points[0].value);
};

// 跳转到指定点
const jumpToPoint = (index) => {
  stopAnimation();
  marker.setPosition(props.points[index].value);
  currentPoint.value = props.points[index];
  map.setCenter(props.points[index].value);
  map.setZoom(12);
};

// 根据位置更新当前点位信息
const updateCurrentPoint = (position) => {
  const lng = position.getLng();
  const lat = position.getLat();
  
  let minDist = Infinity;
  let nearestPoint = null;
  
  props.points.forEach(point => {
    const dist = Math.sqrt(
      Math.pow(point.value[0] - lng, 2) + 
      Math.pow(point.value[1] - lat, 2)
    );
    if (dist < minDist) {
      minDist = dist;
      nearestPoint = point;
    }
  });
  
  if (minDist < 0.01) {
    currentPoint.value = nearestPoint;
  }
};
</script>

<style scoped>
.road-replay {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 600px;
}

.map-container {
  width: 100%;
  height: 100%;
  min-height: 600px;
  border-radius: 8px;
}

.control-panel {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 16px 24px;
  border-radius: 40px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.2);
  z-index: 10;
  display: flex;
  gap: 12px;
}

.btn {
  padding: 8px 24px;
  border: 1px solid #dcdfe6;
  border-radius: 20px;
  background: white;
  cursor: pointer;
  font-size: 14px;
  min-width: 80px;
  transition: all 0.3s;
}

.btn:hover {
  background: #f5f7fa;
}

.btn-primary {
  background: #409EFF;
  color: white;
  border-color: #409EFF;
}

.btn-primary:hover {
  background: #66b1ff;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.info-panel {
  position: absolute;
  top: 20px;
  left: 20px;
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.15);
  max-width: 300px;
  z-index: 10;
}

.info-panel h4 {
  margin: 0 0 8px 0;
  font-size: 16px;
  font-weight: 600;
}

.info-panel .time {
  color: #666;
  font-size: 14px;
  margin: 4px 0;
}

.info-panel .event {
  color: #409EFF;
  font-size: 14px;
  margin: 8px 0 0 0;
  padding-top: 8px;
  border-top: 1px solid #eee;
}
</style>