<template>
  <banner />
  <menu-list />
  <home-content />
  <home-footer />
</template>

<script setup>
import axios from 'axios';
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore'
const userStore = useUserStore()
defineOptions({
  name: 'HomeIndex'
})
import banner from './banner.vue';
import menuList from '@/components/common/menuList.vue';
import homeContent from './content.vue';
import homeFooter from './footer.vue';

onMounted(()=>{7
  // 如果pinia中存在 gaode key 不请求
  if(userStore.GAODE_KEY && userStore.GAODE_ENCKEY){
    return
  } else {
    // 获取可以读取的apikey有哪些
    axios.get('https://gaoziyuan.netlify.app/.netlify/functions/gettypes').then(res=>{
    // axios.get('http://localhost:8888/.netlify/functions/gettypes').then(res=>{
      // 是否允许获取高德地图key
      const includeGaode = res.data.supportedTypes.includes('gaode');
      const includeGaodeenc = res.data.supportedTypes.includes('gaodeenc');
      if(includeGaode){
        axios.post('https://gaoziyuan.netlify.app/.netlify/functions/getkey',{type:'gaode'}).then(res=>{
          userStore.SETGAODEKEY(res.data)
        })
      }
      if(includeGaodeenc){
        axios.post('https://gaoziyuan.netlify.app/.netlify/functions/getkey',{type:'gaodeenc'}).then(res=>{
          userStore.SETGAODEENCKEY(res.data)
        })
      }
    })
  }
})

</script>

<style scoped></style>
