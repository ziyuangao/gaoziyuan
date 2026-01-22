<template>
  <banner />
  <menu-list />
  <home-content />
  <home-footer />
</template>

<script setup>
defineOptions({
  name: 'HomeIndex'
})
import banner from './banner.vue';
import menuList from '@/components/common/menuList.vue';
import homeContent from './content.vue';
import homeFooter from './footer.vue';

</script>

<style scoped></style>
