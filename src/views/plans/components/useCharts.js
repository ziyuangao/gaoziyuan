import * as echarts from 'echarts'

export const useCharts = () => {
  const initChart = (type, data, container, title) => {
    const chart = echarts.init(container)
    let option

    switch (type) {
      case 'distance':
        option = getDistanceOption(data, title)
        break
      case 'sugar':
        option = getSugarOption(data, title)
        break
      case 'sleep':
        option = getSleepOption(data, title)
        break
      default:
        console.warn('Unknown chart type:', type)
        return
    }

    chart.setOption(option)
    
    const handleResize = () => chart.resize()
    window.addEventListener('resize', handleResize)
    
    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize)
      chart.dispose()
    }
  }

  // 跑步距离图表配置
  const getDistanceOption = (data, title) => ({
    title: { text: title, left: 'center' },
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        const item = data[params[0].dataIndex]
        if (!item.distance || item.distance == 0) {
          return `${item.date}<br/>距离: 0公里<br/>备注: 休息日`
        }
        return `${item.date}<br/>距离: ${item.distance}公里${item.calorie ? `<br/>卡路里: ${item.calorie}kcal` : ''}${item.notes ? `<br/>备注: ${item.notes}` : ''}`
      }
    },
    xAxis: {
      type: 'category',
      data: data.map(item => item.date.substring(5)),
      axisLabel: { rotate: 45 }
    },
    yAxis: { type: 'value', name: '距离(公里)' },
    series: [{
      data: data.map(item => parseFloat(item.distance) || 0),
      type: 'line',
      smooth: true,
      lineStyle: { width: 3 },
      itemStyle: { color: '#5470C6' }
    }],
    grid: { containLabel: true }
  })

  // 不喝糖水图表配置
  const getSugarOption = (data, title) => {
    const counts = { Y: 0, N: 0 }
    data.forEach(item => {
      if (item.sugarFree === 'Y' || item.sugarFree === 'N') {
        counts[item.sugarFree]++
      }
    })

    return {
      title: { text: title, left: 'center' },
      tooltip: { trigger: 'item', formatter: '{b}: {c}天 ({d}%)' },
      series: [{
        type: 'pie',
        radius: '70%',
        data: [
          { value: counts.Y, name: '忍住了(Y)', itemStyle: { color: '#27ae60' } },
          { value: counts.N, name: '没忍住(N)', itemStyle: { color: '#e74c3c' } }
        ],
        label: { formatter: '{b}: {d}%' },
        emphasis: { scale: true, scaleSize: 10 }
      }]
    }
  }

  // 睡眠时间图表配置
  const getSleepOption = (data, title) => {
    const parseTime = (timeStr) => {
      if (!timeStr) return 0
      const [h, m] = timeStr.split(':').map(Number)
      return h * 60 + m
    }

    const formatTime = (minutes) => {
      const isNextDay = minutes >= 1440
      const display = isNextDay ? minutes - 1440 : minutes
      const h = Math.floor(display / 60)
      const m = display % 60
      return `${h}:${m.toString().padStart(2, '0')}${isNextDay ? ' (次日)' : ''}`
    }

    const expected = data.map(item => parseTime(item.expectedBedtime))
    const actual = data.map(item => parseTime(item.actualBedtime))
    const allTimes = [...expected, ...actual].filter(t => t > 0)

    return {
      title: { text: title, left: 'center' },
      tooltip: {
        trigger: 'axis',
        formatter: (params) => {
          const idx = params[0].dataIndex
          return `${data[idx].date}<br/>
          计划: ${formatTime(expected[idx])}<br/>
          实际: ${formatTime(actual[idx])}`
        }
      },
      xAxis: {
        type: 'category',
        data: data.map(item => item.date.substring(5)),
        axisLabel: { rotate: 45 }
      },
      yAxis: {
        type: 'value',
        name: '就寝时间',
        min: Math.min(...allTimes),
        max: Math.max(...allTimes),
        axisLabel: { formatter: formatTime }
      },
      series: [
        {
          name: '计划时间',
          type: 'bar',
          data: expected,
          itemStyle: { color: '#3498db' }
        },
        {
          name: '实际时间',
          type: 'bar',
          data: actual,
          itemStyle: ({ dataIndex }) => ({
            color: actual[dataIndex] - expected[dataIndex] > 30 ? '#e74c3c' : '#27ae60'
          })
        }
      ]
    }
  }

  return { initChart }
}