<template>
  <div class="creative-not-found">
    <div class="scene">
      <!-- 太空场景 -->
      <div class="stars">
        <div v-for="n in 50" :key="n" class="star" :style="starStyle(n)"></div>
      </div>
      
      <!-- 404 数字 -->
      <div class="floating-number">
        <div class="number-4 number-4-1">4</div>
        <div class="number-0">0</div>
        <div class="number-4 number-4-2">4</div>
      </div>
      
      <!-- 火箭 -->
      <div class="rocket">
        <div class="rocket-body">
          <div class="rocket-window"></div>
        </div>
        <div class="rocket-fins">
          <div class="fin fin-left"></div>
          <div class="fin fin-right"></div>
        </div>
        <div class="rocket-flames" :class="{ 'launching': isLaunching }">
          <div class="flame"></div>
          <div class="flame"></div>
        </div>
      </div>
      
      <!-- 宇航员 -->
      <div class="astronaut" :class="{ 'floating': !isLaunching }">
        <div class="helmet">
          <div class="visor"></div>
        </div>
        <div class="body">
          <div class="arm arm-left"></div>
          <div class="arm arm-right"></div>
        </div>
        <div class="legs">
          <div class="leg leg-left"></div>
          <div class="leg leg-right"></div>
        </div>
      </div>
    </div>
    
    <div class="message">
      <h1>哎呀！页面飞走了</h1>
      <p>就像这艘火箭，您要找的页面已经启程去探索宇宙了</p>
      
      <div class="controls">
        <el-button 
          type="primary" 
          size="large" 
          round
          @click="goHome"
          :icon="HomeFilled"
          class="control-btn"
        >
          返回首页
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { HomeFilled } from '@element-plus/icons-vue'

const router = useRouter()
const isLaunching = ref(false)

// 生成星星样式
const starStyle = (index) => {
  const size = Math.random() * 3 + 1
  const duration = Math.random() * 5 + 3
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    width: `${size}px`,
    height: `${size}px`,
    animationDuration: `${duration}s`
  }
}

// 返回首页
const goHome = () => {
  router.push('/home')
}

onMounted(() => {
  // 可以添加一些初始化动画
})
</script>

<style scoped>
.creative-not-found {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to bottom, #0a0a2a, #1a1a3a);
  color: white;
  overflow: hidden;
}

.scene {
  flex: 1;
  position: relative;
  overflow: hidden;
  min-height: 400px;
}

/* 星星 */
.stars {
  position: absolute;
  width: 100%;
  height: 100%;
}

.star {
  position: absolute;
  background: white;
  border-radius: 50%;
  animation: twinkle linear infinite;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 1; }
}

/* 404 数字 */
.floating-number {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  gap: 30px;
  font-size: 120px;
  font-weight: 900;
  opacity: 0.1;
  z-index: 1;
}

.number-4, .number-0 {
  animation: float 6s ease-in-out infinite;
}

.number-4-1 {
  animation-delay: 0s;
}

.number-0 {
  animation-delay: 2s;
}

.number-4-2 {
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-30px); }
}

/* 火箭 */
.rocket {
  position: absolute;
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 150px;
  transition: all 0.5s;
  z-index: 2;
}

.rocket.launching {
  bottom: 100vh;
}

.rocket-body {
  position: absolute;
  width: 60px;
  height: 120px;
  background: linear-gradient(45deg, #ff6b6b, #ff8e53);
  border-radius: 50% 50% 20% 20%;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
}

.rocket-window {
  position: absolute;
  width: 30px;
  height: 30px;
  background: #4ecdc4;
  border-radius: 50%;
  top: 25px;
  left: 50%;
  transform: translateX(-50%);
  border: 3px solid #1a1a3a;
}

.rocket-fins {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30px;
}

.fin {
  position: absolute;
  width: 40px;
  height: 60px;
  background: #ff8e53;
  bottom: 0;
}

.fin-left {
  left: -20px;
  transform: skewY(30deg);
  border-radius: 5px 5px 0 0;
}

.fin-right {
  right: -20px;
  transform: skewY(-30deg);
  border-radius: 5px 5px 0 0;
}

.rocket-flames {
  position: absolute;
  bottom: -50px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 60px;
}

.flame {
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, #ffd166, #ff6b6b);
  border-radius: 50% 50% 20% 20%;
  animation: flame 0.5s ease-in-out infinite alternate;
}

.rocket-flames.launching .flame {
  animation: launchFlame 0.2s ease-in-out infinite alternate;
}

@keyframes flame {
  from { height: 60px; opacity: 0.7; }
  to { height: 80px; opacity: 1; }
}

@keyframes launchFlame {
  from { height: 80px; opacity: 0.8; }
  to { height: 120px; opacity: 1; }
}

/* 宇航员 */
.astronaut {
  position: absolute;
  bottom: 100px;
  right: 20%;
  width: 60px;
  height: 100px;
  z-index: 2;
}

.astronaut.floating {
  animation: astronautFloat 3s ease-in-out infinite;
}

@keyframes astronautFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

.helmet {
  position: absolute;
  width: 50px;
  height: 50px;
  background: white;
  border-radius: 50%;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
}

.visor {
  position: absolute;
  width: 40px;
  height: 30px;
  background: #4ecdc4;
  border-radius: 20px;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
}

.body {
  position: absolute;
  width: 40px;
  height: 50px;
  background: white;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 10px;
}

.arm {
  position: absolute;
  width: 20px;
  height: 40px;
  background: white;
  top: 45px;
}

.arm-left {
  left: -15px;
  transform: rotate(45deg);
}

.arm-right {
  right: -15px;
  transform: rotate(-45deg);
}

.legs {
  position: absolute;
  width: 40px;
  height: 40px;
  top: 85px;
  left: 50%;
  transform: translateX(-50%);
}

.leg {
  position: absolute;
  width: 15px;
  height: 40px;
  background: white;
  bottom: 0;
}

.leg-left {
  left: 5px;
  transform: rotate(15deg);
}

.leg-right {
  right: 5px;
  transform: rotate(-15deg);
}

/* 消息区域 */
.message {
  padding: 40px 20px;
  text-align: center;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.message h1 {
  font-size: 36px;
  margin-bottom: 16px;
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.message p {
  font-size: 18px;
  color: #a0aec0;
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.controls {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.control-btn {
  min-width: 200px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .floating-number {
    font-size: 80px;
    gap: 20px;
  }
  
  .message h1 {
    font-size: 28px;
  }
  
  .controls {
    flex-direction: column;
    align-items: center;
  }
  
  .control-btn {
    width: 100%;
    max-width: 300px;
  }
  
  .astronaut {
    right: 10%;
    transform: scale(0.8);
  }
}
</style>