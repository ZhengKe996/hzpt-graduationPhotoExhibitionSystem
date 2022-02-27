<template>
  <div class="own-table">
    <div class="header">
      <slot name="header">
        <h2 class="title">毕业照管理</h2>
        <div>
          <el-date-picker
            v-model="years"
            type="year"
            placeholder="请选择毕业时间"
            format="YYYY"
            @change="handleYearChange"
          />
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
        width="80"
      />
      <el-table-column
        prop="years"
        align="center"
        label="毕业时间"
        width="120"
      />
      <el-table-column
        prop="college.college"
        align="center"
        label="所属学院"
        width="180"
      />
      <el-table-column
        prop="subject.subject"
        align="center"
        label="专业名"
        width="180"
      />

      <el-table-column align="center" width="180">
        <template #default="scope">
          <el-image
            fit="cover"
            :src="
              JSON.parse(scope.row.img)[0]
                ? `${IMGURL}/${JSON.parse(scope.row.img)[0].url}`
                : 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            "
            :preview-src-list="[
              JSON.parse(scope.row.img)[0]
                ? `${IMGURL}/${JSON.parse(scope.row.img)[0].url}`
                : 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            ]"
            :initial-index="0"
          />
        </template>
      </el-table-column>

      <el-table-column align="center" width="180">
        <template #default="scope">
          <el-image
            fit="cover"
            :src="
              JSON.parse(scope.row.img)[1]
                ? `${IMGURL}/${JSON.parse(scope.row.img)[1].url}`
                : 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
            "
            :preview-src-list="[
              JSON.parse(scope.row.img)[1]
                ? `${IMGURL}/${JSON.parse(scope.row.img)[1].url}`
                : 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            ]"
            :initial-index="0"
          />
        </template>
      </el-table-column>
      <el-table-column type="index" fixed="right" width="140" align="center">
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
import { IMGURL } from "@/config";

import DeleteMessage from "@/base-ui/DeleteMessage";

const props = defineProps({
  tableData: Array,
  total: Number,
});

const emit = defineEmit([
  "newClick",
  "editClick",
  "deleteClick",
  "handleCurrentChange",
  "handleYearChange",
]);

const years = ref();

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

const handleYearChange = (year) => {
  emit("handleYearChange", year);
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

.image-slot {
  font-size: 30px;
}
.image-slot .el-icon {
  font-size: 30px;
}
.el-image {
  width: 40%;
  height: 40px;
}
</style>
