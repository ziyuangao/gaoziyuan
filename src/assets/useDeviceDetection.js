import { ref, onMounted, onUnmounted } from 'vue'

/**
 * 响应式设备检测Composable
 */
export function useDeviceDetection() {
  const deviceType = ref('pc') // 'mobile' | 'tablet' | 'pc'
  const screenWidth = ref(window.innerWidth)
  const screenHeight = ref(window.innerHeight)
  const isMobile = ref(false)
  const isTablet = ref(false)
  const isPC = ref(true)

  // 检测设备类型
  const detectDevice = () => {
    screenWidth.value = window.innerWidth
    screenHeight.value = window.innerHeight

    // 通过屏幕宽度判断（主流方式）
    if (screenWidth.value < 768) {
      deviceType.value = 'mobile'
      isMobile.value = true
      isTablet.value = false
      isPC.value = false
    } else if (screenWidth.value >= 768 && screenWidth.value <= 1024) {
      deviceType.value = 'tablet'
      isMobile.value = false
      isTablet.value = true
      isPC.value = false
    } else {
      deviceType.value = 'pc'
      isMobile.value = false
      isTablet.value = false
      isPC.value = true
    }
  }

  // 通过User Agent进行更精确的判断
  const detectByUserAgent = () => {
    const ua = navigator.userAgent.toLowerCase()
    
    // 移动设备判断
    const isMobileUA = /mobile|android|iphone|ipod|windows phone|blackberry|webos|opera mini|iemobile/.test(ua)
    const isTabletUA = /ipad|tablet|kindle|silk/.test(ua)
    
    if (isTabletUA) {
      deviceType.value = 'tablet'
      isMobile.value = false
      isTablet.value = true
      isPC.value = false
    } else if (isMobileUA) {
      deviceType.value = 'mobile'
      isMobile.value = true
      isTablet.value = false
      isPC.value = false
    }
  }

  // 处理窗口大小变化
  const handleResize = () => {
    detectDevice()
  }

  // 初始化
  onMounted(() => {
    detectByUserAgent() // 先根据UA判断
    detectDevice()      // 再根据屏幕宽度判断
    
    // 监听窗口大小变化
    window.addEventListener('resize', handleResize)
  })

  // 清理
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
  })

  return {
    deviceType,
    screenWidth,
    screenHeight,
    isMobile,
    isTablet,
    isPC
  }
}