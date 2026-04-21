import api from './axios'

// 获取英雄联盟数据全部英雄数据
export const getLOLHeroList = () =>
  api.get('https://game.gtimg.cn/images/lol/act/img/js/heroList/hero_list.js')
// 获取舔狗日记的文案信息
export const getDogTextInfo = () => api.get('https://v2.xxapi.cn/api/dog')

// 从自己服务器获取指定的key值
export const getMyKey = (params) => api.post('/.netlify/functions/getkey', params)
// 和deepseek对话
export const talkToDeepseek = (params) => api.post('/.netlify/functions/deepseek', params)
// 注册接口
export const registerUser = (params) => api.post('/.netlify/functions/signup', params)
// 登录接口
export const loginUser = (params) => api.post('/.netlify/functions/login', params)
// 新增留言接口
export const addmsg = (params) =>
  api.post('/.netlify/functions/addmsg', params, {
    headers: {
      user_token: sessionStorage.getItem('user_token') || '',
      token: `${new Date().getTime()}+gaoziyuan`
    }
  })
// 获取留言接口
export const getmsglist = (params) => api.get('/.netlify/functions/getmsglist', params)
// 删除留言接口
export const deletemsg = (params) =>
  api.post('/.netlify/functions/deletemsg', params, {
    headers: {
      user_token: sessionStorage.getItem('user_token') || '',
      token: `${new Date().getTime()}+gaoziyuan`
    }
  })
