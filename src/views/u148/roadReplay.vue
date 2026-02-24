<template>
  <div class="page">
    <RoadReplay 
      :points="points" 
      :api-key="apiKey"
      :security-js-code="encKey"
    />
  </div>
</template>

<script setup>
import RoadReplay from './components/TrackPlayback.vue';

const apiKey = import.meta.env.VITE_AMAP_API_KEY;
const encKey = import.meta.env.VITE_AMAP_API_ENC_KEY;
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
    event: '🛑 休息半小时 · 累计行驶 870km · 服务区全是人和车',
    type: 'important'
  },
  {
    name: '上海·华康佳苑',
    value: [121.680, 31.270],
    info: '26/02/21 18:30 到达',
    event: '🏁 终点 · 累计行驶 994km · 总耗时25h',
    type: 'end'
  }
];
</script>

<style scoped>
.page {
  width: 100%;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
}
</style>