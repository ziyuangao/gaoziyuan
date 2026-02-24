<template>
  <div class="roadmap-wrapper">
    <!-- 标题和统计卡片 -->
    <div class="stats-header">
      <h1>🚗 南阳 → 上海 · 萌新千里长征记</h1>
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-value">{{ totalMileage }} km</div>
          <div class="stat-label">总里程</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ totalTime }} h</div>
          <div class="stat-label">总耗时</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">{{ points.length - 2 }} 次</div>
          <div class="stat-label">服务区休息</div>
        </div>
        <div class="stat-card">
          <div class="stat-value">1 晚</div>
          <div class="stat-label">过夜</div>
        </div>
      </div>
    </div>

    <!-- 地图容器 -->
    <div ref="chartRef" class="chart-container"></div>

    <!-- 点位详情卡片 -->
    <div class="points-detail">
      <h3>📍 行程停靠点详情</h3>
      <div class="points-grid">
        <div v-for="(point, index) in points" :key="index" class="point-card" :class="{
          'start-point': index === 0,
          'end-point': index === points.length - 1,
          'overnight-point': point.event?.includes('🌙'),
          'important-point': point.event?.includes('⚠️') || point.event?.includes('🛑')
        }" @click="highlightPoint(index)">
          <div class="point-index">{{ index + 1 }}</div>
          <div class="point-content">
            <div class="point-name">{{ point.name }}</div>
            <div class="point-info">{{ point.info }}</div>
            <div v-if="point.event" class="point-event">{{ point.event }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 图例说明 -->
    <div class="legend">
      <span class="legend-item start-legend">🚩 起点</span>
      <span class="legend-item rest-legend">🛑 普通休息</span>
      <span class="legend-item overnight-legend">🌙 过夜点</span>
      <span class="legend-item important-legend">⚠️ 重要节点</span>
      <span class="legend-item end-legend">🏁 终点</span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';
import chinaJSON from './china.json';

// 1. 初始化地图容器
const chartRef = ref(null);
let chartInstance = null;

const totalMileage = ref(994); // 总里程
const totalTime = ref(25); // 总耗时

// 2. 定义行程点位数据（坐标顺序对应行程）- 增强版信息
const points = [
  {
    name: '南阳·车站北路和谐小区',
    value: [112.540, 33.020],
    info: '26/02/20 17:20 出发',
    event: '🚩 起点',
    type: 'start'
  },
  {
    name: '泌阳服务区',
    value: [113.310, 32.790],
    info: '26/02/20 18:27 到达 · 停留5分钟',
    event: '累计行驶 120km · 上厕所 · 买水',
    type: 'rest'
  },
  {
    name: '罗山服务区',
    value: [114.410, 32.150],
    info: '26/02/20 19:37 到达 · 停留25分钟',
    event: '累计行驶 260km · 吃晚饭',
    type: 'rest'
  },
  {
    name: '罗集服务区',
    value: [116.280, 31.990],
    info: '26/02/20 21:09 到达 · 过夜9.5h',
    event: '🌙 累计行驶 370km · 准备咖啡饮料 · 车内过夜 · 早上8点准时出发',
    type: 'overnight'
  },
  {
    name: '巢湖服务区',
    value: [117.840, 31.620],
    info: '26/02/21 09:37 到达 · 停留15分钟',
    event: '⚠️ 惊险一刻 · 前车急刹车 · 遇到好多车祸 · 累计行驶 580km',
    type: 'important'
  },
  {
    name: '茅山服务区',
    value: [119.370, 31.720],
    info: '26/02/21 13:10 到达 · 停留15分钟',
    event: '累计行驶 750km · 找不到停车位 · 凑乎吃一口继续出发',
    type: 'rest'
  },
  {
    name: '阳澄湖服务区',
    value: [120.840, 31.420],
    info: '26/02/21 16:42 到达 · 停留30分钟',
    event: '🛑 最后休整 · 累计行驶 870km',
    type: 'important'
  },
  {
    name: '上海·华康佳苑',
    value: [121.680, 31.270],
    info: '26/02/21 18:30 到达',
    event: `🏁 终点 · 累计行驶 ${totalMileage.value}km · 总耗时${totalTime.value}h`,
    type: 'end'
  }
];

// 3. 生成路径线数据（按顺序连接点位）
const lineData = points.map((pt, index) => {
  if (index === points.length - 1) return null;
  return {
    coords: [pt.value, points[index + 1].value],
    lineStyle: {
      color: index === 3 ? '#9b4d96' :  // 罗集段紫色
        index === 4 ? '#e68a2e' :  // 巢湖段橙色
          '#FFA500'                   // 默认橙色
    }
  };
}).filter(item => item !== null);

// 4. 点位高亮函数（点击卡片时地图上对应点闪烁）
function highlightPoint(index) {
  if (!chartInstance) return;

  // 触发对应点位的 emphasis 状态
  chartInstance.dispatchAction({
    type: 'showTip',
    seriesIndex: 0,
    dataIndex: index
  });

  // 3秒后隐藏
  setTimeout(() => {
    chartInstance.dispatchAction({
      type: 'hideTip'
    });
  }, 3000);
}

// 5. 初始化 ECharts 配置
function initChart() {
  if (!chartRef.value) return;

  // 注册中国地图
  echarts.registerMap('china', chinaJSON);

  chartInstance = echarts.init(chartRef.value);

  const option = {
    backgroundColor: '#0e1c2c',
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(20, 30, 40, 0.95)',
      borderColor: '#FFA500',
      textStyle: { color: '#fff', fontSize: 12 },
      formatter: function (params) {
        if (params.componentType === 'series' && params.seriesType === 'scatter') {
          const point = points[params.dataIndex];
          return `
            <div style="padding: 8px;">
              <b style="color: #FFA500; font-size: 14px;">${point.name}</b><br/>
              <span style="color: #aaa;">${point.info}</span><br/>
              <span style="color: #FF5F5C;">${point.event}</span>
            </div>
          `;
        }
        return '';
      }
    },
    geo: {
      map: 'china',
      roam: true,
      label: { show: false },
      itemStyle: {
        areaColor: '#0e1c2c',
        borderColor: '#0079ff',
        borderWidth: 0.5
      },
      emphasis: {
        itemStyle: { areaColor: '#1a2f3f' }
      },
      zoom: 10.0,
      center: [118, 32], // 聚焦河南-安徽-江苏-上海
      scaleLimit: { min: 4, max: 10 }
    },
    series: [
      // 1) 标记点位（散点图）
      {
        name: '行程点',
        type: 'scatter',
        coordinateSystem: 'geo',
        data: points.map((p, idx) => ({
          name: p.name,
          value: p.value,
          info: p.info,
          event: p.event,
          itemStyle: {
            color: idx === 0 ? '#2b7a4b' :     // 起点绿色
              idx === 7 ? '#d04255' :     // 终点红色
                p.type === 'overnight' ? '#9b4d96' :
                  p.type === 'important' ? '#e68a2e' : '#FF5F5C'
          }
        })),
        symbolSize: 12,
        symbol: function (val, params) {
          const idx = params.dataIndex;
          if (idx === 0 || idx === 7) return 'pin';  // 起点终点用图钉
          return 'circle';
        },
        label: {
          show: true,
          formatter: (params) => {
            const idx = params.dataIndex;
            if (idx === 0) return '南阳';
            if (idx === 7) return '上海';
            return '';
          },
          position: 'top',
          color: '#fff',
          fontSize: 11,
          backgroundColor: 'rgba(0,0,0,0.5)',
          padding: [2, 6],
          borderRadius: 10
        },
        emphasis: {
          scale: 1.5,
          label: {
            show: true,
            formatter: (params) => {
              const p = points[params.dataIndex];
              return `${p.name}`;
            },
            backgroundColor: 'rgba(0,0,0,0.8)',
            borderColor: '#FFA500',
            borderWidth: 1
          }
        }
      },
      // 2) 路径连线（带动画效果）
      {
        name: '行驶路径',
        type: 'lines',
        coordinateSystem: 'geo',
        effect: {
          show: true,
          period: 12,        // 12秒跑完全程
          trailLength: 0,    // 无拖尾
          symbol: 'arrow',
          symbolSize: 10,
          color: '#FFA500',
          loop: false        // 只跑一次
        },
        lineStyle: {
          width: 3,
          opacity: 0.8,
          curveness: 0
        },
        data: lineData.map(item => ({
          coords: item.coords,
          lineStyle: item.lineStyle
        }))
      }
    ]
  };

  chartInstance.setOption(option);
}

// 6. 监听窗口变化
function handleResize() {
  if (chartInstance) {
    chartInstance.resize();
  }
}

// 生命周期钩子
onMounted(() => {
  initChart();
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
  if (chartInstance) {
    chartInstance.dispose();
  }
});
</script>

<style scoped>
.roadmap-wrapper {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
  background: #0a1622;
  border-radius: 24px;
  font-family: 'Microsoft YaHei', sans-serif;
  color: #fff;
}

/* 统计卡片样式 */
.stats-header {
  margin-bottom: 20px;
}

.stats-header h1 {
  text-align: center;
  color: #FFA500;
  margin: 0 0 20px 0;
  font-size: 2rem;
  text-shadow: 0 2px 10px rgba(255, 165, 0, 0.3);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 10px;
}

.stat-card {
  background: rgba(20, 30, 40, 0.8);
  padding: 20px;
  border-radius: 16px;
  text-align: center;
  border: 1px solid #2a3a4a;
  backdrop-filter: blur(5px);
}

.stat-value {
  font-size: 2.2rem;
  font-weight: 700;
  color: #FFA500;
  line-height: 1.2;
}

.stat-label {
  color: #8a9aa8;
  font-size: 0.9rem;
  margin-top: 6px;
}

/* 地图容器 */
.chart-container {
  width: 100%;
  height: 600px;
  background: #0e1c2c;
  border-radius: 20px;
  margin-bottom: 30px;
  border: 1px solid #2a3a4a;
  overflow: hidden;
}

/* 点位详情卡片区域 */
.points-detail {
  background: rgba(20, 30, 40, 0.8);
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #2a3a4a;
}

.points-detail h3 {
  margin: 0 0 20px 0;
  color: #FFA500;
  font-size: 1.3rem;
}

.points-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
}

.point-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px;
  background: rgba(10, 20, 30, 0.8);
  border-radius: 12px;
  border-left: 4px solid #FF5F5C;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid #2a3a4a;
}

.point-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 165, 0, 0.2);
  border-color: #FFA500;
}

.point-card.start-point {
  border-left-color: #2b7a4b;
}

.point-card.end-point {
  border-left-color: #d04255;
}

.point-card.overnight-point {
  border-left-color: #9b4d96;
}

.point-card.important-point {
  border-left-color: #e68a2e;
}

.point-index {
  width: 28px;
  height: 28px;
  background: #1a2a3a;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  color: #FFA500;
  flex-shrink: 0;
}

.point-content {
  flex: 1;
}

.point-name {
  font-weight: 600;
  color: #fff;
  margin-bottom: 4px;
  font-size: 1rem;
}

.point-info {
  color: #8a9aa8;
  font-size: 0.85rem;
  margin-bottom: 4px;
}

.point-event {
  color: #FFA500;
  font-size: 0.85rem;
  padding-top: 4px;
  border-top: 1px dashed #2a3a4a;
  margin-top: 4px;
}

/* 图例说明 */
.legend {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 15px 20px;
  background: rgba(20, 30, 40, 0.8);
  border-radius: 40px;
  border: 1px solid #2a3a4a;
  justify-content: center;
}

.legend-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #8a9aa8;
  font-size: 0.9rem;
}

.legend-item::before {
  content: '';
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.start-legend::before {
  background: #2b7a4b;
}

.rest-legend::before {
  background: #FF5F5C;
}

.overnight-legend::before {
  background: #9b4d96;
}

.important-legend::before {
  background: #e68a2e;
}

.end-legend::before {
  background: #d04255;
}

/* 响应式适配 */
@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .points-grid {
    grid-template-columns: 1fr;
  }

  .legend {
    flex-direction: column;
    align-items: flex-start;
    border-radius: 20px;
  }

  .stats-header h1 {
    font-size: 1.5rem;
  }
}
</style>