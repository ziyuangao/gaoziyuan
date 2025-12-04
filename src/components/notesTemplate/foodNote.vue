<template>
  <div class="page">
    <el-link class="list_item" v-for="item in showList" underline :key="item.url" :href="item.url"
      :type="fileTypeConfig[item.fileType]" target="_blank" :icon="iconConfig(item.fileType)">
      {{ item.title }}
    </el-link>
  </div>
</template>
<script setup>
import { FolderOpened, Document, Files } from '@element-plus/icons-vue'
const fileTypeConfig = {
  'doc': 'info',
  'sheet': 'success',
  'other': 'danger',
}

const iconConfig = (type) => {
  let result = null;
  switch (type) {
    case 'doc':
      result = Document
      break;
    case 'sheet':
      result = FolderOpened
      break;
    case 'other':
      result = Files
      break;
    default:
      result = Files
      break;
  }
  return result;
}
const showList = [
  {
    title: '饮食记录',
    url: 'https://docs.qq.com/doc/DQWFvZWVqcm9TQW1Q',
    fileType: 'sheet',
  },
  {
    title: 'jQuery方法预览',
    url: 'https://app.xmind.cn/share/izVfAdHr?xid=CbXvd14E',
    fileType: 'other'
  },
  {
    title: '21天计划V1.0.0',
    url: 'https://docs.qq.com/sheet/DSFB5Q3hscnNuTmhu',
    fileType: 'sheet',
  },
  {
    title: '原生js关于DOM操作',
    url: 'https://app.xmind.cn/share/UfsisFvD?xid=9GvbfUcU',
    fileType: 'other'
  },
  {
    title: '动态信誉积分防黄牛系统设计说明',
    url: 'https://docs.qq.com/doc/DQWFvZWVqcm9TQW1Q',
    fileType: 'doc',
  },
  {
    title: '阴阳师浅梦墨汐抽奖记录',
    url: 'https://docs.qq.com/sheet/DQUJBZkRqWGZaZGNx',
    fileType: 'sheet'
  },
]
</script>
<style scoped>
.page {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-flow: row wrap;
}

.list_item {
  font-size: 18px;
}

.list_item~.list_item {
  margin-left: 18px;
}
</style>