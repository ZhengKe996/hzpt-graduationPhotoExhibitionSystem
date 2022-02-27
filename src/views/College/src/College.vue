<template>
  <div class="college">
    <college-table
      :tableData="tableData"
      @newClick="newClick"
      @editClick="editClick"
      @deleteClick="deleteClick"
      class="college-table"
    />
  </div>
  <college-form
    :form="form"
    :title="title"
    :dialogVisible="newDialog"
    @handleClose="handleClose"
    @handleCancel="handleClose"
    @handleConfirm="newHandleConfirm"
  />
  <college-form
    :form="form"
    :title="title"
    :dialogVisible="editDialog"
    @handleClose="handleClose"
    @handleCancel="handleClose"
    @handleConfirm="editHandleConfirm"
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
onMounted(() => {
  getCollege();
});
const getCollege = async () => {
  ownRequest.get({ url: `${COLLEGE}` }).then((res) => {
    tableData.value = res.data.data;
  });
};

const form = reactive({
  id: "",
  college: "",
});

const newDialog = ref(false);
const editDialog = ref(false);

const title = ref("新增学院信息");

const newClick = () => {
  newDialog.value = true;
  title.value = "新增学院信息";
};

const newHandleConfirm = () => {
  ownRequest
    .post({
      url: `${COLLEGE}`,
      data: {
        college: form.college,
      },
    })
    .then((res) => {
      const { flag, message } = res.data;
      if (flag) {
        Notification.Success(addCollege, `${message}`);
      } else {
        Notification.Error(addCollege, `${message}`);
      }
    })
    .catch((err) => {
      Notification.Error(addCollege, `${err}`);
    })
    .finally(() => {
      handleClose();
      getCollege();
    });
};
const editHandleConfirm = () => {
  ownRequest
    .put({
      url: `${COLLEGE}`,
      data: {
        id: form.id,
        college: form.college,
      },
    })
    .then((res) => {
      const { flag, message, data } = res.data;
      if (flag) {
        Notification.Success(editCollege, `${message}`);
      } else {
        Notification.Error(editCollege, `${message}`);
      }
    })
    .catch((err) => {
      Notification.Error(editCollege, `${err}`);
    })
    .finally(() => {
      handleClose();
      getCollege();
    });
};

const editClick = (item) => {
  ownRequest.get({ url: `${COLLEGE}/${item}` }).then((res) => {
    editDialog.value = true;
    title.value = "编辑学院信息";
    const { id, college } = res.data.data;
    form.college = college;
    form.id = id;
  });
};
const handleClose = () => {
  newDialog.value = false;
  editDialog.value = false;
  form.college = "";
  form.id = null;
};

const deleteClick = (item) => {
  ownRequest
    .delete({ url: `${COLLEGE}/${item}` })
    .then((res) => {
      const { flag, message, data } = res.data;
      if (flag) {
        Notification.Success(deleteCollege, `${message}`);
      } else {
        Notification.Error(deleteCollege, `${message},${data}`);
      }
    })
    .catch((err) => {
      Notification.Error(deleteCollege, `${err}`);
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
    width: 900px;
  }
}
</style>
