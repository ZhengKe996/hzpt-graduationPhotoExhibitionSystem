<template>
  <el-row>
    <el-col :span="24" class="college">
      <college-table
        :tableData="tableData"
        @newClick="newClick"
        @editClick="editClick"
        @deleteClick="deleteClick"
      />
    </el-col>
  </el-row>
  <college-form
    :form="form"
    :title="title"
    :dialogVisible="dialogVisible"
    @handleClose="handleClose"
    @handleCancel="handleClose"
    @handleConfirm="handleConfirm"
  />
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import Notification from "@/base-ui/Notification";
import { COLLEGE } from "@/config";
import ownRequest from "@/service";
import CollegeTable from "./College-table.vue";
import CollegeForm from "./College-form.vue";

const tableData = ref();
const addCollege = "新增学院";
const editCollege = "编辑学院";
const deleteCollege = "删除学院";

const form = reactive({
  id: "",
  college: "",
});
const flag = ref("N");
const dialogVisible = ref(false);

const title = ref("新增学院信息");
onMounted(() => {
  getCollege();
});

const getCollege = async () => {
  ownRequest
    .get({ url: `${COLLEGE}` })
    .then((res) => {
      tableData.value = res.data.data;
    })
    .catch((err) => {
      Notification.Error("请检查网络是否畅通", err);
    });
};
const newClick = () => {
  title.value = "新增学院信息";
  flag.value = "N";
  dialogVisible.value = true;
};

const editClick = (item) => {
  ownRequest
    .get({ url: `${COLLEGE}/${item}` })
    .then((res) => {
      const { college, id } = res.data.data;
      form.college = college;
      form.id = id;
      title.value = "编辑学院信息";
      flag.value = "E";
      dialogVisible.value = true;
    })
    .catch((err) => {
      Notification.Error("请检查网络是否畅通", err);
    });
};

const handleConfirm = () => {
  if (flag.value === "N") {
    ownRequest
      .post({ url: `${COLLEGE}`, data: form })
      .then((res) => {
        const { flag, message } = res.data;
        if (flag) {
          Notification.Success(addCollege, message);
        } else {
          Notification.Error(addCollege, message);
        }
      })
      .catch((err) => {
        Notification.Error(addCollege, err);
      })
      .finally(() => {
        getCollege();
        handleClose();
      });
    return;
  }
  if (flag.value === "E") {
    ownRequest
      .put({ url: `${COLLEGE}`, data: form })
      .then((res) => {
        const { flag, message } = res.data;
        if (flag) {
          Notification.Success(editCollege, message);
        } else {
          Notification.Error(editCollege, message);
        }
      })
      .catch((err) => {
        Notification.Error(editCollege, err);
      })
      .finally(() => {
        getCollege();
        handleClose();
      });
    return;
  }
};

const handleClose = () => {
  dialogVisible.value = false;
  form.college = "";
  form.id = null;
};

const deleteClick = (item) => {
  ownRequest
    .delete({ url: `${COLLEGE}/${item}` })
    .then((res) => {
      const { flag, message } = res.data;
      if (flag) {
        Notification.Success(deleteCollege, message);
      } else {
        Notification.Error(deleteCollege, message);
      }
    })
    .catch((err) => {
      Notification.Error(deleteCollege, err);
    })
    .finally(() => {
      getCollege();
    });
};
</script>

<style lang="scss" scoped>
.college {
  display: flex;
  justify-content: center;

  .college-table {
    margin-top: 40px;
  }
}
</style>
