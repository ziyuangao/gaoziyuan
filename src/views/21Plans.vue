<template>
  <div class="chart-container">
    <div ref="runChartRef" style="width: 100%; height: 400px;"></div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import no1Data from '@/dataPool/plans/no1.json'

export default {
  setup() {
    const runChartRef = ref(null);
    const rawData = no1Data;

    // 自定义tooltip格式化函数
    const formatTooltip = (params) => {
      const data = params[0].data;
      // 如果有notes则优先显示notes
      if (data.notes && data.notes.trim() !== '') {
        return `
          <div style="padding: 10px; background: #fff; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1)">
            <div style="font-weight: bold; margin-bottom: 5px; color: #333;">${data.date}</div>
            <div style="color: #666;">${data.notes}</div>
          </div>
        `;
      }
      // 没有notes则显示跑步数据
      return `
        <div style="padding: 10px; background: #fff; border-radius: 4px; box-shadow: 0 2px 8px rgba(0,0,0,0.1)">
          <div style="font-weight: bold; margin-bottom: 5px; color: #333;">${data.date}</div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #666;">跑步距离:</span>
            <span style="font-weight: bold; color: #5470C6;">${data.distance} km</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="color: #666;">卡路里消耗:</span>
            <span style="font-weight: bold; color: #EE6666;">${data.calorie || 0} 大卡</span>
          </div>
        </div>
      `;
    };

    const processData = () => {
      return rawData
        .map(item => ({
          date: item.date,
          distance: item.distance,
          notes: item.notes || '',
          calorie: item.calorie || 0
        }))
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    };

    const initChart = () => {
      const chart = echarts.init(runChartRef.value);
      const processedData = processData();
      
      const option = {
        title: {
          text: '二十一天跑步计划执行成果',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis',
          formatter: formatTooltip,  // 使用自定义的tooltip格式化函数
          backgroundColor: 'transparent',
          borderWidth: 0,
          padding: 0
        },
        legend: {
          data: ['跑步距离'],
          bottom: 10
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '15%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: processedData.map(item => item.date),
          axisLabel: {
            rotate: 45,
            interval: 0
          }
        },
        yAxis: {
          type: 'value',
          name: '跑步距离 (km)'
        },
        series: [
          {
            name: '跑步距离',
            type: 'line',
            data: processedData.map(item => ({
              value: item.distance,
              date: item.date,
              distance: item.distance,
              notes: item.notes,
              calorie: item.calorie
            })),
            itemStyle: {
              color: '#5470C6'
            },
            lineStyle: {
              width: 3
            },
            symbolSize: 8,
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            markLine: {
              data: [{ type: 'average', name: '平均值' }]
            }
          }
        ]
      };

      chart.setOption(option);
      window.addEventListener('resize', function() {
        chart.resize();
      });
    };

    onMounted(() => {
      initChart();
    });

    return {
      runChartRef
    };
  }
};
</script>

<style scoped>
.chart-container {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}
</style>