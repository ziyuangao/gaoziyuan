<template>
  <div class="metric-card">
    <h2 class="card-title">{{ title }}</h2>
    <div class="card-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true }
})
</script>

<style scoped>
.metric-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s, box-shadow 0.2s;
}

.metric-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
}

.card-title {
  color: #2980b9;
  margin: 0 0 16px 0;
  padding-left: 12px;
  border-left: 4px solid #3498db;
  font-size: 18px;
}

.card-content {
  line-height: 1.6;
}
</style>