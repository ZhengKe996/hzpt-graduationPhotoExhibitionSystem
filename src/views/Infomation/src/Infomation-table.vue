<template>
  <div class="own-table">
    <div class="header">
      <slot name="header">
        <h2 class="title">毕业照管理</h2>

        <el-date-picker
          v-model="years"
          size="small"
          type="year"
          placeholder="请选择毕业时间"
          format="YYYY"
          @change="handleYearChange"
        />
        <el-dropdown @command="handleCollegeIdChange">
          <el-button plain class="el-dropdown-link">
            {{ selectCollege }}
          </el-button>
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
        width="80"
      />
      <el-table-column prop="college" align="center" label="所属学院" />
      <el-table-column prop="marjor" align="center" label="专业名" />
      <el-table-column prop="cname" align="center" label="班级名" />

      <el-table-column align="center" width="180">
        <template #default="scope">
          <el-image
            fit="cover"
            :src="
              JSON.parse(scope.row.img)[0]
                ? `${IMGURL}/${JSON.parse(scope.row.img)[0].url}`
                : ERRORIMG
            "
            :preview-src-list="[
              JSON.parse(scope.row.img)[0]
                ? `${IMGURL}/${JSON.parse(scope.row.img)[0].url}`
                : ERRORIMG,
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
                : ERRORIMG
            "
            :preview-src-list="[
              JSON.parse(scope.row.img)[1]
                ? `${IMGURL}/${JSON.parse(scope.row.img)[1].url}`
                : ERRORIMG,
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
import { IMGURL, ERRORIMG } from "@/config";

import DeleteMessage from "@/base-ui/DeleteMessage";
const selectCollege = ref("请选择学院");
const props = defineProps({
  tableData: Array,
  total: Number,
  collegelist: Array,
});

const emit = defineEmit([
  "newClick",
  "editClick",
  "deleteClick",
  "handleCurrentChange",
  "handleYearChange",
  "handleCollegeIdChange",
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
const handleCollegeIdChange = (item) => {
  selectCollege.value = item.college;
  emit("handleCollegeIdChange", item.id);
};
</script>

<style lang="scss" scoped>
.own-table {
  width: 90%;
  height: 80vh;
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
    width: 30%;
    height: 30px;
  }
  .el-dropdown-link {
    width: 150px;
  }
  .is-center {
    height: 40px;
  }
}
</style>
