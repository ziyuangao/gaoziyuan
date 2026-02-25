import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  // 状态
  state: () => ({
    GAODE_KEY:'',
    GAODE_ENCKEY:'',
  }),

  // 计算属性
  getters: {
    doubleCounter: (state) => state.counter * 2
  },

  // 方法/动作
  actions: {
    SETGAODEKEY(key){
      this.GAODE_KEY = key;
    },
    SETGAODEENCKEY(key){
      this.GAODE_ENCKEY = key;
    },
    // 切换主题
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
    },

    // 计数器方法
    increment() {
      this.counter++
    },
    decrement() {
      this.counter--
    },
    resetCounter() {
      this.counter = 0
    }
  }
})