import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Loading',
      redirect: '/home',
      // component: Loading
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/notes',
      name: 'Notes',
      redirect: '/notes/javaScript',
      component: () => import('../views/Notes.vue'),
      children: [
        { path: '/notes/javaScript', component: () => import('../components/notesTemplate/javaScript.vue') },
        { path: '/notes/jQuery', component: () => import('../components/notesTemplate/jQuery.vue') },
        { path: '/notes/vue', component: () => import('../components/notesTemplate/vue.vue') },
        { path: '/notes/miniProgram', component: () => import('../components/notesTemplate/miniProgram.vue') },
        { path: '/notes/food', component: () => import('../components/notesTemplate/foodNote.vue') },
        { path: '/notes/music', component: () => import('../components/notesTemplate/music.vue') },
        { path: '/notes/test', component: () => import('../components/notesTemplate/test.vue') },
      ],
    },
    {
      path: '/plans',
      name: 'Plans',
      component: () => import('../views/21Plans.vue')
    },
    {
      path: '/daily',
      name: 'Daily',
      component: () => import('../views/Daily.vue')
    },
    {
      path: '/pageDetail',
      name: 'PageDetail',
      component: () => import('../views/pageDetail.vue')
    },
    {
      path: '/infiniteScroll',
      name: 'infiniteScroll',
      component: () => import('../views/others/infiniteScroll.vue')
    },
    {
      path: '/starrySky',
      name: 'starrySky',
      component: () => import('../views/others/starrySky.vue')
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/About.vue')
    },
    {
      path: '/YesOrNo',
      name: 'YesOrNo',
      component: () => import('../views/YesOrNo.vue')
    },
    {
      path: '/Earth',
      name: 'Earth',
      component: () => import('../views/Earth.vue')
    },
    {
      path: '/lol',
      name: 'LOL',
      component: () => import('../views/LOL.vue')
    },
    {
      path: '/slidein',
      name: 'slidein',
      component: () => import('../views/slidein.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/testFile.vue')
    }
  ]
})

export default router
