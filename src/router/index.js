import { createRouter, createWebHashHistory } from 'vue-router'

let routes = [];//全部路由
// 顶层路由
const topRoutes = [
  {
    path: '/',
    name: 'Loading',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'HomePage',
    meta: { title: '首页' },
    component: () => import('../views/home/index.vue')
  },
  {
    path: '/notes',
    name: 'NoteList',
    meta: { title: '笔记' },
    component: () => import('../views/notes/index.vue')
  },
  {
    path: '/photos',
    name: 'PhotoWall',
    meta: { title: '照片墙' },
    component: () => import('../views/photos/index.vue')
  },
  {
    path: '/about',
    name: 'AboutMe',
    meta: { title: '关于我' },
    component: () => import('../views/about/index.vue')
  },
  {
    path: '/404',
    name: 'NotFound',
    meta: { title: '404' },
    component: () => import('../views/404/index.vue')
  },
  
  {
    path: '/plans',
    name: 'Plans',
    meta: {
      title: '我的计划'
    },
    component: () => import('../views/plans/21Plans.vue')
  },
  {
    path: '/roadMap',
    name: 'roadMap',
    meta: {
      title: '路径图'
    },
    component: () => import('../views/plans/roadMap.vue')
  },
]

// 工具路由
const toolsRoutes = [
  {
    path: '/tools/coin',
    name: 'coin',
    meta: {
      title: 'every coin has two sides'
    },
    component: () => import('../views/tools/coin.vue')
  },
  {
    path: '/tools/music',
    name: 'music',
    meta: {
      title: '本地音乐播放器'
    },
    component: () => import('../views/tools/music.vue')
  },
  {
    path: '/tools/lol',
    name: '随机工具',
    meta: { title: '英雄联盟随机工具' },
    component: () => import('../views/tools/LOL.vue')
  },
  {
    path: '/tools/randomName',
    name: 'random',
    meta: {
      title: '随机名字生成器'
    },
    component: () => import('../views/tools/randomName.vue')
  },
]
// u148路由
const u148Routes = [
  {
    path: '/u148/dog',
    name: 'Dog',
    meta: {
      title: '舔狗日记'
    },
    component: () => import('../views/u148/dog.vue')
  },
  {
    path: '/u148/deepseek',
    name: 'deepseek',
    component: () => import('../views/u148/deepseek.vue')
  }
]
// 快速链接路由
const quickLinksRoutes = [
  {
    path: '/links/decorationBreak',
    name: 'decorationBreak',
    meta: {
      title: '文字背景断行'
    },
    component: () => import('../views/links/decorationBreak.vue')
  },
  {
    path: '/links/starrySky',
    name: 'starrySky',
    meta: {
      title: '星空背景'
    },
    component: () => import('../views/links/starrySky.vue')
  },
  {
    path: '/links/rotateTheEarth',
    name: 'rotateTheEarth',
    meta: {
      title: '转动地球'
    },
    component: () => import('../views/links/rotateTheEarth.vue')
  },
  {
    path: '/links/slidein',
    name: 'slidein',
    meta: {
      title: '滑动进入'
    },
    component: () => import('../views/links/slideIn.vue')
  },
]

routes = [...topRoutes, ...toolsRoutes, ...u148Routes, ...quickLinksRoutes]
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

// 创建路由名称映射，方便检查路由是否存在
const routePathMap = new Set(routes.map((route) => route.path))
console.log(routePathMap, 'routePathMap')

/**
 * 全局前置守卫
 * 在路由跳转前执行
 */
router.beforeEach((to, from, next) => {
  console.log(`路由跳转: ${from.path} -> ${to.path}`)

  if (to.matched.length === 0) {
    console.warn(`路由不存在: ${to.path}，跳转到404页面`)
    next({
      path: '/404',
      query: { originalPath: to.fullPath, timestamp: Date.now() },
      replace: true
    })
  } else {
    next()
  }
})

/**
 * 全局后置钩子
 * 路由跳转完成后执行
 */
// router.afterEach((to, from) => {
//   // 可以在这里进行页面统计、埋点等
//   // 发送页面浏览事件到分析平台
//   if (window.gtag) {
//     window.gtag('event', 'page_view', {
//       page_path: to.path,
//       page_title: to.name || 'Unknown',
//       page_location: window.location.href
//     })
//   }
// })

export default router
