<template>
  <div class="progress-container">
    <div class="progress-bar">
      <div 
        class="progress-fill" 
        :style="progressStyle"
      >
        {{ progress }}%
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  progress: { type: Number, required: true },
  color: { type: String, default: '#3498db' }
})

const progressStyle = computed(() => ({
  width: `${Math.min(100, Math.max(0, props.progress))}%`,
  backgroundColor: props.color
}))
</script>

<style scoped>
.progress-container {
  margin: 15px 0;
}

.progress-bar {
  height: 24px;
  background: #f0f3f4;
  border-radius: 12px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 12px;
  text-align: center;
  color: white;
  font-size: 13px;
  font-weight: 500;
  line-height: 24px;
  transition: width 0.6s ease;
  min-width: 50px;
}
</style>