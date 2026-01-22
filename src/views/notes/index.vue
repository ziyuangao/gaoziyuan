<template>
	<el-container class="notes-wrap">
		<menu-list />
		<div class="note-content">
			<notes-header />
			<section>
				<el-card class="card-item" shadow="hover" v-for="item in networkFile" underline :key="item.url">
					<el-link :href="item.url" :type="fileTypeConfig[item.fileType]" target="_blank"
						:icon="iconConfig(item.fileType)">
						{{ item.title }}
					</el-link>
				</el-card>
			</section>
		</div>
	</el-container>
</template>

<script setup>
defineOptions({
	name: 'NotesIndex'
})
import menuList from '@/components/common/menuList.vue'
import notesHeader from './header.vue'
import { FolderOpened, Document, Files } from '@element-plus/icons-vue'
const iconConfig = (type) => {
	let result = null
	switch (type) {
		case 'doc':
			result = Document
			break
		case 'sheet':
			result = FolderOpened
			break
		case 'other':
			result = Files
			break
		default:
			result = Files
			break
	}
	return result
}
const fileTypeConfig = {
	doc: 'info',
	sheet: 'success',
	other: 'danger'
}
let networkFile = [
	{
		title: '饮食记录',
		url: 'https://docs.qq.com/sheet/DSGtqTm1SaFhXRGti',
		fileType: 'sheet'
	},
	{
		title: 'jQuery方法预览',
		url: 'https://app.xmind.cn/share/izVfAdHr?xid=CbXvd14E',
		fileType: 'other'
	},
	{
		title: '动态信誉积分防黄牛系统设计说明',
		url: 'https://docs.qq.com/doc/DQWFvZWVqcm9TQW1Q',
		fileType: 'doc'
	},
	{
		title: '短剧-失语之城',
		url: 'https://docs.qq.com/doc/DQUdscWZ2YkV5WUZk',
		fileType: 'doc'
	},
	{
		title: '婚恋app-《缘桥计划：基于行为匹配的渐进式婚恋关系验证平台》',
		url: 'https://docs.qq.com/doc/DQW1GdG9GQW9qbE1H',
		fileType: 'doc'
	},
	{
		title: '原生js关于DOM操作',
		url: 'https://app.xmind.cn/share/UfsisFvD?xid=9GvbfUcU',
		fileType: 'other'
	},
	{
		title: '21天计划V1.0.0',
		url: 'https://docs.qq.com/sheet/DSFB5Q3hscnNuTmhu',
		fileType: 'sheet'
	},
	{
		title: '阴阳师浅梦墨汐抽奖记录',
		url: 'https://docs.qq.com/sheet/DQUJBZkRqWGZaZGNx',
		fileType: 'sheet'
	}
]

// 洗牌算法
const shuffleArray = (array) => {
	const newArray = [...array] // 创建副本以避免修改原数组
	for (let i = newArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
			;[newArray[i], newArray[j]] = [newArray[j], newArray[i]] // 交换元素
	}
	return newArray
}

networkFile = shuffleArray(networkFile)
</script>

<style scoped>
.notes-wrap {
	width: 100%;
	min-height: 100vh;
	background: #f2f6fc;
	padding: 50px 0 100px;
}

.note-content {
	margin: 0 auto;
	width: 720px;
	max-width: 100%;
}

:deep(.menuList .el-button) {
	color: #606266;
}

:deep(.menuList .el-button:hover) {
	color: #67c23a;
}

.card-item~.card-item {
	margin: 10px 0;
}

.card-item :deep(.el-card__body) {
	padding: 10px;
}
</style>
