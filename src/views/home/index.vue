<template>
  <banner />
  <menu-list />
  <home-content />
  <home-footer />
</template>

<script setup>
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore'
import { getMyKey } from '@/api/request';
const userStore = useUserStore()
defineOptions({
  name: 'HomeIndex'
})
import banner from './banner.vue';
import menuList from '@/components/common/menuList.vue';
import homeContent from './content.vue';
import homeFooter from './footer.vue';

onMounted(()=>{
  // 如果pinia中存在 gaode key 不请求
  if(userStore.GAODE_KEY && userStore.GAODE_ENCKEY){
    return
  } else {
    getMyKey({type:'gaode'}).then(res=>{
      userStore.SETGAODEKEY(res.data)
    })
    getMyKey({type:'gaodeenc'}).then(res=>{
      userStore.SETGAODEKEY(res.data)
    })
  }
})

</script>

<style scoped></style>
