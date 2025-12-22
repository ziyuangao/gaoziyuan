<template>
  <div class="header">
    <h1>健康数据统计报告 数据周期：2025-07-09 至 2025-07-30（共22天）</h1>
  </div>
  <div class="charts-container">
    <!-- 图表1：跑步距离折线图 -->
    <div ref="distanceChart" class="chart"></div>

    <!-- 图表2：不喝糖水情况饼图 -->
    <div ref="sugarChart" class="chart"></div>

    <!-- 图表3：睡眠时间对比柱状图 -->
    <div ref="sleepChart" class="chart"></div>
  </div>
  <div>
    <div class="flex-container">
      <div class="flex-item">
        <div class="metric-card">
          <h2>🏃 运动目标完成率</h2>
          <div>有效运动天数：<span class="highlight">14天</span>（含跑步和篮球）</div>
          <div>休息日：8天（其中3天有明确原因）</div>
          <div class="progress-bar">
            <div class="progress" style="width: 63.6%;">63.6%</div>
          </div>
          <table>
            <tr>
              <th>运动类型</th>
              <th>天数</th>
              <th>占比</th>
            </tr>
            <tr>
              <td>跑步</td>
              <td>11</td>
              <td>78.6%</td>
            </tr>
            <tr>
              <td>篮球</td>
              <td>3</td>
              <td>21.4%</td>
            </tr>
          </table>
        </div>

        <div class="metric-card">
          <h2>🍬 不喝糖水目标达成</h2>
          <div>忍住了（Y）：<span class="highlight success">20天</span></div>
          <div>没忍住（N）：2天（7月23日、7月20日）</div>
          <div class="progress-bar">
            <div class="progress" style="width: 90.9%; background: #27ae60;">90.9%</div>
          </div>
        </div>
      </div>

      <div class="flex-item">
        <div class="metric-card">
          <h2>😴 睡眠计划遵守率（修正版）</h2>
          <div>准时/提前入睡：<span class="highlight">12天</span></div>
          <div>熬夜天数：10天（含<span class="highlight warning">4次极端熬夜</span>）</div>
          <div class="progress-bar">
            <div class="progress" style="width: 54.5%; background: #f39c12;">54.5%</div>
          </div>
          <table>
            <tr>
              <th>偏差类型</th>
              <th>平均时间</th>
              <th>最大偏差</th>
            </tr>
            <tr>
              <td>提前入睡</td>
              <td>23分钟</td>
              <td>1小时19分钟</td>
            </tr>
            <tr>
              <td>延迟入睡</td>
              <td>1小时14分钟</td>
              <td>7小时20分钟（7月25日）</td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <div class="final-score">
      综合健康目标完成度：<span style="font-size: 36px; font-weight: bold;">70.4%</span>
      <div style="font-size: 16px;">（运动40% + 不喝糖水30% + 睡眠30%）</div>
    </div>

    <div class="metric-card">
      <h2>📊 详细数据权重分析</h2>
      <table>
        <tr>
          <th>评估维度</th>
          <th>原始完成率</th>
          <th>权重</th>
          <th>加权得分</th>
        </tr>
        <tr>
          <td>运动目标</td>
          <td>63.6%</td>
          <td>40%</td>
          <td>25.4%</td>
        </tr>
        <tr>
          <td>不喝糖水目标</td>
          <td>90.9%</td>
          <td>30%</td>
          <td>27.3%</td>
        </tr>
        <tr>
          <td>睡眠目标</td>
          <td>59.1%</td>
          <td>30%</td>
          <td>17.7%</td>
        </tr>
        <tr style="font-weight: bold; background-color: #f2f2f2;">
          <td colspan="3">总分</td>
          <td>70.4%</td>
        </tr>
      </table>
    </div>

    <div style="text-align: center; margin-top: 30px; color: #7f8c8d; font-size: 14px;">
      数据统计时间：2025年7月 • 基于22天跟踪数据
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import no1Data from "@/dataPool/plans/no1.json"
export default {
  setup() {
    const planDataArr = no1Data
    const distanceChart = ref(null);
    const sugarChart = ref(null);
    const sleepChart = ref(null);

    onMounted(() => {
      initDistanceChart();
      initSugarChart();
      initSleepChart();
    });

    // 处理时间格式（将"23:30"转换为分钟数）
    const timeToMinutes = (timeStr) => {
      if (!timeStr) return 0;
      const [hours, minutes] = timeStr.split(':').map(Number);
      return hours * 60 + minutes;
    };

    // 图表1：跑步距离折线图
    const initDistanceChart = () => {
      const chart = echarts.init(distanceChart.value);

      const dates = planDataArr.map(item => item.date.substring(5)); // 只显示月-日
      const distances = planDataArr.map(item => parseFloat(item.distance) || 0);

      const option = {
        title: { text: '每日跑步距离(公里)', left: 'center' },
        tooltip: {
          trigger: 'item',
          formatter: (params) => {
            const item = planDataArr[params.dataIndex];
            if (item.notes) {
              return `${item.date}<br/>备注: ${item.notes}`;
            }
            if (item.distance == 0) {
              return `${item.date}<br/>备注: 偷懒了没去跑`;
            } else {
              return `${item.date}<br/>距离: ${item.distance}公里<br/>卡路里: ${item.calorie}kcal`;
            }
          }
        },
        xAxis: {
          type: 'category',
          data: dates,
          axisLabel: { rotate: 45 }
        },
        yAxis: { type: 'value', name: '距离(公里)' },
        series: [{
          data: distances,
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          itemStyle: { color: '#5470C6' },
          lineStyle: { width: 3 }
        }],
        grid: { containLabel: true }
      };

      chart.setOption(option);
      window.addEventListener('resize', () => chart.resize());
    };

    // 图表2：不喝糖水情况饼图
    const initSugarChart = () => {
      const chart = echarts.init(sugarChart.value);

      const sugarData = planDataArr.reduce((acc, item) => {
        acc[item.sugarFree] = (acc[item.sugarFree] || 0) + 1;
        return acc;
      }, { Y: 0, N: 0 });

      const option = {
        title: { text: '不喝糖水情况统计', left: 'center' },
        tooltip: { trigger: 'item' },
        series: [{
          name: '不喝糖饮料情况',
          type: 'pie',
          radius: '70%',
          data: [
            { value: sugarData.Y, name: '忍住了(Y)', itemStyle: { color: '#91CC75' } },
            { value: sugarData.N, name: '没忍住(N)', itemStyle: { color: '#EE6666' } }
          ],
          label: {
            formatter: '{b}: {d}% ({c}天)'
          },
          emphasis: {
            itemStyle: { shadowBlur: 10, shadowOffsetX: 0 }
          }
        }]
      };

      chart.setOption(option);
      window.addEventListener('resize', () => chart.resize());
    };

    // 图表3：睡眠时间对比柱状图
    const initSleepChart = () => {
      const chart = echarts.init(sleepChart.value);

      // 数据处理函数：将时间字符串转换为标准化分钟数（支持超过24小时）
      const parseTimeToMinutes = (timeStr) => {
        let [h, m] = timeStr.split(':').map(Number);
        // 保留原始超过24小时的数据（如30:50 → 30*60+50=1850）
        return h * 60 + m;
      };

      // 分钟数转显示时间（处理超过24小时的情况）
      const formatMinutesToTime = (totalMinutes) => {
        const isNextDay = totalMinutes >= 1440; // 1440分钟=24小时
        const displayMins = isNextDay ? totalMinutes - 1440 : totalMinutes;
        const h = Math.floor(displayMins / 60);
        const m = displayMins % 60;
        return `${h}:${m.toString().padStart(2, '0')}${isNextDay ? ' (次日)' : ''}`;
      };

      // 准备数据
      const dates = planDataArr.map(item => item.date.substring(5));
      const expectedTimes = planDataArr.map(item => parseTimeToMinutes(item.expectedBedtime));
      const actualTimes = planDataArr.map(item => parseTimeToMinutes(item.actualBedtime));

      // 计算Y轴范围（动态适应数据）
      const allTimes = [...expectedTimes, ...actualTimes].filter(t => t > 0);
      const minTime = Math.min(...allTimes);
      const maxTime = Math.max(...allTimes);

      // 确保基准从22:00(1320)开始，最大到次日6:00(1800)
      const yAxisMin = Math.min(22 * 60, Math.floor(minTime / 60) * 60);
      const yAxisMax = Math.max(26 * 60, Math.ceil(maxTime / 60) * 60);

      const option = {
        title: { text: '计划 vs 实际睡眠时间', left: 'center' },
        tooltip: {
          trigger: 'axis',
          formatter: (params) => {
            const data = planDataArr[params[0].dataIndex];
            return `
          ${data.date}<br/>
          计划: ${formatMinutesToTime(parseTimeToMinutes(data.expectedBedtime))}<br/>
          实际: ${formatMinutesToTime(parseTimeToMinutes(data.actualBedtime))}
        `;
          }
        },
        xAxis: {
          type: 'category',
          data: dates,
          axisLabel: { rotate: 45 }
        },
        yAxis: {
          type: 'value',
          name: '就寝时间',
          min: yAxisMin,
          max: yAxisMax,
          axisLabel: {
            formatter: (totalMinutes) => formatMinutesToTime(totalMinutes)
          },
          axisPointer: {
            label: {
              formatter: ({ value }) => formatMinutesToTime(value)
            }
          }
        },
        series: [
          {
            name: '计划时间',
            data: expectedTimes,
            type: 'bar',
            barGap: 0,
            itemStyle: { color: '#5470C6' }
          },
          {
            name: '实际时间',
            data: actualTimes,
            type: 'bar',
            itemStyle: {
              color: ({ dataIndex }) => {
                const actual = actualTimes[dataIndex];
                const expected = expectedTimes[dataIndex];
                // 实际比计划晚30分钟以上显示红色
                return actual - expected > 30 ? '#EE6666' : '#91CC75';
              }
            }
          }
        ]
      };
      chart.setOption(option);
      window.addEventListener('resize', () => chart.resize());
    };

    return { distanceChart, sugarChart, sleepChart };
  }
};
</script>

<style scoped>
.charts-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  padding: 20px 0;
}

.chart {
  width: 100%;
  height: 400px;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 10px;
  box-sizing: border-box;
}

/* 让第一个图表占据整行 */
.chart:first-child {
  grid-column: 1 / -1;
}

.chart:last-child {
  grid-column: 1 / -1;
}

@media (max-width: 768px) {
  .charts-container {
    grid-template-columns: 1fr;
  }
}

h1 {
  color: #2c3e50;
  text-align: center;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
}

h2 {
  color: #2980b9;
  margin-top: 25px;
  border-left: 4px solid #3498db;
  padding-left: 10px;
}

.metric-card {
  background: white;
  border-radius: 8px;
  padding: 15px;
  margin: 15px 0;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.progress-bar {
  height: 20px;
  background: #ecf0f1;
  border-radius: 10px;
  margin: 10px 0;
  overflow: hidden;
}

.progress {
  height: 100%;
  border-radius: 10px;
  background: #3498db;
  text-align: center;
  color: white;
  font-size: 12px;
  line-height: 20px;
}

.highlight {
  font-weight: bold;
  color: #e74c3c;
}

.success {
  color: #27ae60;
}

.warning {
  color: #f39c12;
}

.flex-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.flex-item {
  width: 48%;
  min-width: 300px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 15px 0;
}

th,
td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}

.final-score {
  text-align: center;
  font-size: 24px;
  margin: 30px 0;
  padding: 20px;
  background: linear-gradient(135deg, #3498db, #2ecc71);
  color: white;
  border-radius: 8px;
}
</style>