<template>
  <div class="page">
    <el-table :data="state.tableConfig.data" :laoding="state.loading" size="small">
      <el-table-column prop="date" label="日期" width="120px" />
      <el-table-column prop="breakfast" label="早饭" />
      <el-table-column prop="lunch" label="午饭" />
      <el-table-column prop="dinner" label="晚饭" />
      <el-table-column label="操作" width="120px">
        <template #default="scope">
          <el-button @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="text_right">
      <el-pagination v-model:currentPage="state.tableConfig.currentPage"
        :size="state.tableConfig.size"
        :default-page-size="state.tableConfig.size"
        layout="prev, pager, next,sizes"
        :total="state.tableConfig.total" @current-change="handleCurrentChange"
        @size-change="handleSizeChange" />
    </div>
  </div>
</template>

<script setup>
import foodData from '@/dataPool/food.json'
import { onMounted, reactive } from 'vue';
const state = reactive({
  loading: false,
  tableConfig: {
    data: [],
    currentPage: 1,
    size:20,
    total: null,
  }
})
const handleSizeChange = (val)=>{
  state.tableConfig.size = val;
  getTableData();
}
const handleCurrentChange = (val) => {
  state.tableConfig.currentPage = val;
  getTableData();
}
const getTableData = () => {
  state.loading = true;
  setTimeout(() => {
    let resData = foodData;
    state.tableConfig.data = resData.slice((state.tableConfig.currentPage - 1) * state.tableConfig.size, state.tableConfig.currentPage * state.tableConfig.size);
    state.tableConfig.total = resData.length;
    state.loading = false;
  }, 200);
}
const handleEdit = (item) => {
  console.log(item)
}
onMounted(() => {
  getTableData();
})
    // return {state,handleCurrentChange,handleEdit}
</script>
<style scoped>
.page {
  padding: 16px;
  box-sizing: border-box;
  background: rgb(250, 249, 222);
  border-radius: 8px;
}

.text_right {
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
}
</style>