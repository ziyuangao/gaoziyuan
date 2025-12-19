<template>
  <div class="home">
      <banner-template />
      <menu-list />
      <home-wrap />
      <home-footer />
  </div>
</template>

<script>

import bannerTemplate from '@/components/homeTemplate/homeBanner.vue';
import menuList from '@/components/common/menuList.vue';
import homeWrap from '@/components/common/homeWrap.vue';
import homeFooter from '@/components/common/homeFooter.vue';
export default {
  name: 'HomePage',
  components: {
    bannerTemplate,
    menuList,
    homeWrap,
    homeFooter
  },
}
</script>

<style scoped>
</style>
