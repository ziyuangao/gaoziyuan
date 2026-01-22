<template>
  <div ref="chartRef" class="chart-container"></div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { useCharts } from './useCharts'

const props = defineProps({
  type: { type: String, required: true },
  data: { type: Array, required: true },
  title: { type: String, default: '' }
})

const chartRef = ref(null)
const { initChart } = useCharts()

onMounted(() => {
  if (chartRef.value) {
    initChart(props.type, props.data, chartRef.value, props.title)
  }
})

watch(() => props.data, () => {
  if (chartRef.value) {
    initChart(props.type, props.data, chartRef.value, props.title)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', () => {})
})
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 400px;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  background: white;
}
</style>