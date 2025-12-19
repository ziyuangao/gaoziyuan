<template>
  <div>
    <div class="menuList">
      <el-button
        v-for="(item, index) in state.menuList"
        :key="index"
        plain
        text
        :disabled="item.disabled"
        @click="switchRouter(item)"
      >{{ item.menuName }}</el-button>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const state = reactive({
      drawerConfig: {
        direction: "ltr",
      },
      menuList: [
        { id: 1, menuName: "首页", path: "/home", disabled: false },
        { id: 2, menuName: "笔记", path: "/notes", disabled: false },
        { id: 3, menuName: "生活", path: "/daily", disabled: false },
        { id: 4, menuName: "关于", path: "/about", disabled: true },
      ],
    });
    const switchRouter = (item) => {
      if (item.path && !item.disabled) {
        router.push(item.path);
      }
    };
    return { state, switchRouter };
  },
};
</script>
<style scoped>
.menuList {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.menuList .el-button {
  margin: 10px 20px;
  font-size: 16px;
  color: #f5f5f5;
  font-weight: bold;
  background: none;
}
.menuList .el-button:hover {
  color: #606266;
}
</style>