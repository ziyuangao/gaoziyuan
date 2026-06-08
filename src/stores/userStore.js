import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  // 状态
  state: () => ({
    GAODE_KEY: '',
    GAODE_ENCKEY: '',
    DEEPSEEK_ENCKEY: '',
    USER_INFO: {}
  }),

  // 方法/动作
  actions: {
    SETUSERINFO(info) {
      this.USER_INFO = info
    },
    SETGAODEKEY(key) {
      this.GAODE_KEY = key
    },
    SETGAODEENCKEY(key) {
      this.GAODE_ENCKEY = key
    },
    SETDEEPSEEKKEY(key) {
      this.DEEPSEEK_ENCKEY = key
    }
  }
})
