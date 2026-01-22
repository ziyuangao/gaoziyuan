<template>
  <div class="health-report">
    <header class="header">
      <h1>健康数据统计报告 数据周期：{{ period }}（共{{ totalDays }}天）</h1>
    </header>
    
    <!-- 图表区域 -->
    <div class="charts-container">
      <HealthChart 
        type="distance" 
        :data="planData"
        title="每日跑步距离(公里)"
      />
      <HealthChart 
        type="sugar" 
        :data="planData"
        title="不喝糖水情况统计"
      />
      <HealthChart 
        type="sleep" 
        :data="planData"
        title="计划 vs 实际睡眠时间"
        class="full-width"
      />
    </div>

    <!-- 指标卡片区域 -->
    <div class="metrics-grid">
      <div class="metrics-column">
        <MetricCard title="🏃 运动目标完成率">
          <div>有效运动天数：<span class="highlight">14天</span>（含跑步和篮球）</div>
          <div>休息日：8天（其中3天有明确原因）</div>
          <ProgressBar :progress="63.6" />
          <table class="data-table">
            <tr><th>运动类型</th><th>天数</th><th>占比</th></tr>
            <tr><td>跑步</td><td>11</td><td>78.6%</td></tr>
            <tr><td>篮球</td><td>3</td><td>21.4%</td></tr>
          </table>
        </MetricCard>

        <MetricCard title="🍬 不喝糖水目标达成">
          <div>忍住了（Y）：<span class="success">20天</span></div>
          <div>没忍住（N）：2天（7月23日、7月20日）</div>
          <ProgressBar :progress="90.9" color="#27ae60" />
        </MetricCard>
      </div>

      <div class="metrics-column">
        <MetricCard title="😴 睡眠计划遵守率（修正版）">
          <div>准时/提前入睡：<span class="highlight">12天</span></div>
          <div>熬夜天数：10天（含<span class="warning">4次极端熬夜</span>）</div>
          <ProgressBar :progress="54.5" color="#f39c12" />
          <table class="data-table">
            <tr><th>偏差类型</th><th>平均时间</th><th>最大偏差</th></tr>
            <tr><td>提前入睡</td><td>23分钟</td><td>1小时19分钟</td></tr>
            <tr><td>延迟入睡</td><td>1小时14分钟</td><td>7小时20分钟（7月25日）</td></tr>
          </table>
        </MetricCard>
      </div>
    </div>

    <!-- 综合评分 -->
    <div class="final-score">
      综合健康目标完成度：<span class="score">70.4%</span>
      <div class="score-sub">（运动40% + 不喝糖水30% + 睡眠30%）</div>
    </div>

    <!-- 权重分析 -->
    <MetricCard title="📊 详细数据权重分析">
      <table class="data-table">
        <tr><th>评估维度</th><th>原始完成率</th><th>权重</th><th>加权得分</th></tr>
        <tr><td>运动目标</td><td>63.6%</td><td>40%</td><td>25.4%</td></tr>
        <tr><td>不喝糖水目标</td><td>90.9%</td><td>30%</td><td>27.3%</td></tr>
        <tr><td>睡眠目标</td><td>59.1%</td><td>30%</td><td>17.7%</td></tr>
        <tr class="total-row"><td colspan="3">总分</td><td>70.4%</td></tr>
      </table>
    </MetricCard>

    <footer class="footer">
      数据统计时间：2025年7月 • 基于{{ totalDays }}天跟踪数据
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import HealthChart from './components/HealthChart.vue'
import MetricCard from './components/MetricCard.vue'
import ProgressBar from './components/ProgressBar.vue'
import no1Data from '@/dataPool/plans/no1.json'

const planData = ref(no1Data)
const totalDays = computed(() => planData.value.length)
const period = computed(() => {
  const dates = planData.value.map(item => item.date)
  return `${dates[0]} 至 ${dates[dates.length - 1]}`
})
</script>

<style scoped>
.health-report {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  color: #2c3e50;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
}

.charts-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.full-width {
  grid-column: 1 / -1;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.metrics-column {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.final-score {
  text-align: center;
  background: linear-gradient(135deg, #3498db, #2ecc71);
  color: white;
  padding: 30px;
  border-radius: 12px;
  margin: 30px 0;
}

.score {
  font-size: 48px;
  font-weight: bold;
  display: block;
  margin: 10px 0;
}

.score-sub {
  font-size: 16px;
  opacity: 0.9;
}

.highlight {
  color: #e74c3c;
  font-weight: bold;
}

.success {
  color: #27ae60;
  font-weight: bold;
}

.warning {
  color: #f39c12;
  font-weight: bold;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

.data-table th,
.data-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.data-table th {
  background-color: #f8f9fa;
  font-weight: 600;
}

.total-row {
  background-color: #f8f9fa;
  font-weight: bold;
}

.footer {
  text-align: center;
  color: #666;
  font-size: 14px;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

@media (max-width: 768px) {
  .charts-container,
  .metrics-grid {
    grid-template-columns: 1fr;
  }
  
  .chart {
    height: 300px;
  }
}
</style>