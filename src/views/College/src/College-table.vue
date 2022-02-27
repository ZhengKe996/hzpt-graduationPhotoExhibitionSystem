<template>
  <div class="own-table">
    <div class="header">
      <slot name="header">
        <h2 class="title">学院管理</h2>

        <div class="handler">
          <el-button size="mini" type="primary" @click="handleNewClick">
            新建数据
          </el-button>
        </div>
      </slot>
    </div>

    <el-table
      :data="props.tableData"
      border
      size="small"
      style="width: 100%"
      :highlight-current-row="true"
      stripe
    >
      <el-table-column type="selection" align="center" width="80" />
      <el-table-column
        prop="id"
        type="index"
        align="center"
        label="序号"
        width="100"
      />
      <el-table-column
        prop="college"
        align="center"
        label="学院名"
        width="400"
      />
      <el-table-column type="index" width="240" align="center" fixed="right">
        <template #default="scope">
          <div class="handle-btns">
            <el-button
              size="mini"
              type="text"
              @click="handleEditClick(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="text"
              class="handle-btn"
              @click="handleDeleteClick(scope.row)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>
import { defineProps, defineEmit } from "vue";

import DeleteMessage from "@/base-ui/DeleteMessage";

const props = defineProps({
  tableData: Array,
});

const emit = defineEmit(["newClick", "editClick", "deleteClick"]);

const handleDeleteClick = (item) => {
  DeleteMessage().then((res) => {
    if (res) {
      emit("deleteClick", item.id);
    }
  });
};
const handleNewClick = () => {
  emit("newClick");
};
const handleEditClick = (item) => {
  emit("editClick", item.id);
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 28px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}
.handle-btns {
  display: flex;
  justify-content: center;
  .handle-btn {
    color: red;
  }
}
</style>
