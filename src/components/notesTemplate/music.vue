<template>
  <div class="page">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-input v-model="state.searchConfig.name"  
          @input="handleSearch" 
          clearable size="small" placeholder="Please input music name">
          <template #prepend>Name：</template>
        </el-input>
      </el-col>
      <el-col :span="8">
        <el-select v-model="state.searchConfig.type" 
          @change="handleSearch" 
          size="small" placeholder="Please select music type">
          <el-option v-for="item in state.searchConfig.options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-col>
    </el-row>
    <el-table :data="state.tableConfig.data" :laoding="state.loading" size="small" class="page-table">
      <el-table-column type="index" label="Index" width="80" align="center" />
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="type" label="type" width="120" align="center" />
      <el-table-column label="操作" width="120px">
        <template #default="scope">
          <el-button @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:currentPage="state.tableConfig.currentPage" layout="prev, pager, next"
      :total="state.totalData.length" @current-change="handleCurrentChange" />
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue';
import dataPool from '../../dataPool/music.json';
export default {
  setup() {
    const state = reactive({
      loading: false,
      timer: null,
      searchConfig:{
        type: '',
        name: '',
        options: [
        { value: '', label: 'All' },
        { value: 'chinese', label: 'Chinese' },
        { value: 'english', label: 'English' },
        { value: 'absolute', label: 'Absolute' },
        { value: 'asia', label: 'Asia' },
      ],
      },
      totalData: [],//符合条件的所有数据
      tableConfig: {
        data: [],//展示的数据
        currentPage: 1,
      }
    })
    const handleCurrentChange = (val) => {
      state.tableConfig.currentPage = val;
      getTableData();
    }
    const getTableData = () => {
      state.loading = true;
      setTimeout(() => {
        // 整理数据池
        state.totalData = dataPool.filter((item, index) => {
          // 模糊查询 and 类型搜索
          if(!state.searchConfig.type && !state.searchConfig.name){
            return item
          }
          if (item.name.includes(state.searchConfig.name) && item.type == state.searchConfig.type) {
            item.id = `${index+1}`;
            return item;
          }
        })
        state.tableConfig.data = state.totalData.slice((state.tableConfig.currentPage - 1) * 10, state.tableConfig.currentPage * 10);
        state.loading = false;
      }, 200);
    }
    const handleEdit = (item) => {
      console.log(item)
    }
    onMounted(() => {
      getTableData();
    })
    const handleSearch = () => {
      // 防抖
      if (state.timer) return;
      state.timer = setTimeout(() => {
        state.timer = null;
      }, 500);//设定两次检查间隔为200毫秒
      // 初始化table信息
      state.totalData = [];
      state.tableConfig = {
        data: [],
        currentPage: 1,
        total: null
      }
      getTableData();
    }
    return { state, handleCurrentChange, handleEdit, handleSearch }
  }
}
</script>
<style scoped>
.page {
  padding: 16px;
  box-sizing: border-box;
  background: rgb(250, 249, 222);
  border-radius: 8px;
}

.page-table {
  margin-top: 10px;
}
</style>