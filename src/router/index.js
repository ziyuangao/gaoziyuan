import { createRouter, createWebHashHistory } from 'vue-router'

/**
 * Vue Router 路由规则
 *
 * 命名规则：
 * - 路由name：使用PascalCase（大驼峰），如：HomePage, NoteList, UserProfile
 * - 组件文件：使用kebab-case（烤肉串），如：home-page.vue, note-list.vue
 * - 路由path：使用kebab-case（烤肉串），如：/home-page, /notes/list
 *
 * 路由层级：
 * - 一级路由：核心页面，如首页、笔记、相册、关于
 * - 二级路由：功能模块，如笔记详情、相册分类、设置页面
 * - 三级路由：具体功能或详情页，如笔记编辑、照片详情
 *
 * 文件组织：
 * - views/：存放页面级组件（对应路由）
 * - features/：存放功能模块（可按业务领域分组）
 * - components/：存放通用组件
 *
 */

const routes = [
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
    component: () => import('../views/NoteView.vue')
  },
  {
    path: '/photos',
    name: 'PhotoWall',
    meta: { title: '照片墙' },
    component: () => import('../views/photoWall/index.vue')
  },
  {
    path: '/about',
    name: 'AboutMe',
    meta: { title: '关于我' },
    component: () => import('../views/About.vue')
  },
  {
    path: '/404',
    name: 'NotFound',
    meta: { title: '404' },
    component: () => import('../views/404.vue')
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
    path: '/decorationBreak',
    name: 'decorationBreak',
    meta: {
      title: '文字背景断行'
    },
    component: () => import('../views/others/decorationBreak.vue')
  },
  {
    path: '/starrySky',
    name: 'starrySky',
    meta: {
      title: '星空背景'
    },
    component: () => import('../views/others/starrySky.vue')
  },

  {
    path: '/coin',
    name: 'coin',
    meta: {
      title: 'every coin has two sides'
    },
    component: () => import('../views/others/coin.vue')
  },
  {
    path: '/rotateTheEarth',
    name: 'rotateTheEarth',
    meta: {
      title: '转动地球'
    },
    component: () => import('../views/others/rotateTheEarth.vue')
  },
  {
    path: '/lol',
    name: '英雄联盟',
    meta: {
      title: '英雄联盟solo工具'
    },
    component: () => import('../views/u148/LOL.vue')
  },
  {
    path: '/slidein',
    name: 'slidein',
    meta: {
      title: '滑动进入'
    },
    component: () => import('../views/others/slideIn.vue')
  },
  {
    path: '/dog',
    name: 'Dog',
    meta: {
      title: '舔狗日记'
    },
    component: () => import('../views/u148/dog.vue')
  },
  {
    path: '/random',
    name: 'random',
    meta: {
      title: '随机名字生成器'
    },
    component: () => import('../views/u148/random.vue')
  },
  {
    path: '/deepseek',
    name: 'deepseek',
    component: () => import('../views/u148/deepseek.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})

// 创建路由名称映射，方便检查路由是否存在
const routePathMap = new Set(routes.map((route) => route.path))
console.log(routePathMap, 'routePathMap')

/**
 * 检查路由是否存在
 * @param {string} path - 目标路径
 * @returns {boolean}
 */
const isRouteExists = (path) => {
  try {
    // 使用router.resolve进行路由匹配
    const resolved = router.resolve(path)

    // 检查是否匹配到路由且不是通配符路由
    return (
      resolved.matched.length > 0 &&
      !resolved.matched.some((route) => route.path.includes('*') || route.name === 'NotFound')
    )
  } catch (error) {
    return false
  }
}

/**
 * 全局前置守卫
 * 在路由跳转前执行
 */
router.beforeEach((to, from, next) => {
  console.log(`路由跳转: ${from.path} -> ${to.path}`)

  // 1. 检查是否已经是404页面
  if (to.name === 'NotFound') {
    next()
    return
  }

  // 2. 检查路由是否存在
  if (!isRouteExists(to.path)) {
    console.warn(`路由不存在: ${to.path}，跳转到404页面`)

    // 保存原始路径到query参数，方便在404页面显示
    const redirectData = {
      path: '/404',
      query: {
        originalPath: to.fullPath,
        timestamp: Date.now()
      },
      replace: true // 使用replace而不是push，避免浏览器历史记录中出现无效路由
    }

    next(redirectData)
    return
  }

  next()
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
