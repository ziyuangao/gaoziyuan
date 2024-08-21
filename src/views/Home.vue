<template>
  <div class="home">
      <!-- <banner-template /> -->
      <!-- <menu-list /> -->
      <home-wrap />
  </div>
</template>

<script>

// import bannerTemplate from '@/components/homeTemplate/banner.vue'
// import menuList from '@/components/common/menuList.vue'
import homeWrap from '@/components/common/homeWrap.vue'
export default {
  name: 'HomePage',
  components: {
    // bannerTemplate,
    homeWrap
  },
}
</script>
