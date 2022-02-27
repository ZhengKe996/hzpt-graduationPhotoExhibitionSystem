<template>
  <div class="own-table">
    <div class="header">
      <slot name="header">
        <h2 class="title">专业管理</h2>
        <div>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">{{ selectCollege }}</span>
            <template #dropdown>
              <el-dropdown-menu>
                <template v-for="item of collegelist">
                  <el-dropdown-item :command="item">
                    {{ item.college }}
                  </el-dropdown-item>
                </template>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
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
        prop="college.college"
        align="center"
        label="所属学院"
        width="220"
      />
      <el-table-column
        prop="subject"
        align="center"
        label="专业名"
        width="220"
      />
      <el-table-column type="index" width="220" align="center" fixed="right">
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
    <div class="footer">
      <el-pagination
        background
        layout="total ,prev, pager, next"
        :total="total"
        class="mt-4"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script setup>
import { defineProps, defineEmit, ref } from "vue";

import DeleteMessage from "@/base-ui/DeleteMessage";

const props = defineProps({
  tableData: Array,
  total: Number,
  collegelist: Array,
});
const selectCollege = ref("请选择学院");

const emit = defineEmit([
  "newClick",
  "editClick",
  "deleteClick",
  "handleCurrentChange",
  "handleCommand",
]);

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

const handleCurrentChange = (value) => {
  emit("handleCurrentChange", value);
};

const handleCommand = (item) => {
  selectCollege.value = item.college;
  emit("handleCommand", item.id);
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
.footer {
  margin-top: 15px;

  .el-pagination {
    text-align: right;
  }
}
</style>
