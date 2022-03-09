<template>
  <el-row>
    <el-col :span="24" class="marjor">
      <marjor-table
        :tableData="tableData"
        :collegelist="collegeList"
        :total="dataTotal"
        @newClick="newClick"
        @editClick="editClick"
        @deleteClick="deleteClick"
        @handleCommand="handleCommand"
        @handleCurrentChange="handleCurrentChange"
      />
    </el-col>
  </el-row>

  <marjor-form
    :form="form"
    :title="title"
    :dialogVisible="dialogVisible"
    :collegelist="collegeList"
    @handleClose="handleClose"
    @handleCancel="handleClose"
    @handleConfirm="handleConfirm"
  />
</template>

<script setup>
import { reactive, ref, onMounted, watch } from "vue";
import Notification from "@/base-ui/Notification";
import { MARJOR, COLLEGE } from "@/config";
import ownRequest from "@/service";
import MarjorTable from "./Marjor-table.vue";
import MarjorForm from "./Marjor-form.vue";

const form = reactive({
  id: "",
  marjor: "",
  cid: "",
});
const tableData = ref();
const dataTotal = ref();
const collegeList = ref();

const currentPage = ref(1);
const query = ref();

const flag = ref("N");
const dialogVisible = ref(false);
const title = ref("新增专业信息");
const addMarjor = "新增专业";
const editMarjor = "编辑专业";
const deleteMarjor = "删除专业";

onMounted(() => {
  getMarjor(currentPage.value, query.value);
});

watch([currentPage, query], () => {
  getMarjor(currentPage.value, query.value);
});

const getMarjor = async (page, condition) => {
  ownRequest
    .get({
      url: `${MARJOR}`,
      params: {
        size: 10,
        page: page,
        cid: condition,
      },
    })
    .then((res) => {
      const { total, rows } = res.data.data;
      dataTotal.value = total;
      tableData.value = rows;
    })
    .catch((err) => {
      Notification.Error("请检查网络是否畅通", err);
    });

  ownRequest.get({ url: `${COLLEGE}` }).then((res) => {
    const { data } = res.data;
    collegeList.value = data;
  });
};
const newClick = () => {
  title.value = "新增专业信息";
  flag.value = "N";
  dialogVisible.value = true;
};

const editClick = (item) => {
  ownRequest
    .get({ url: `${MARJOR}/${item}` })
    .then((res) => {
      const { id, cid, marjor } = res.data.data;
      form.id = id;
      form.cid = cid;
      form.marjor = marjor;
      title.value = "编辑专业信息";
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
      .post({ url: `${MARJOR}`, data: form })
      .then((res) => {
        const { flag, message } = res.data;
        if (flag) {
          Notification.Success(addMarjor, message);
        } else {
          Notification.Error(addMarjor, message);
        }
      })
      .catch((err) => {
        Notification.Error(addMarjor, err);
      })
      .finally(() => {
        getMarjor(currentPage.value, query.value);
        handleClose();
      });
    return;
  }
  if (flag.value === "E") {
    ownRequest
      .put({ url: `${MARJOR}`, data: form })
      .then((res) => {
        const { flag, message } = res.data;
        if (flag) {
          Notification.Success(editMarjor, message);
        } else {
          Notification.Error(editMarjor, message);
        }
      })
      .catch((err) => {
        Notification.Error(editMarjor, err);
      })
      .finally(() => {
        getMarjor(currentPage.value, query.value);
        handleClose();
      });
    return;
  }
};

const deleteClick = (item) => {
  ownRequest
    .delete({ url: `${MARJOR}/${item}` })
    .then((res) => {
      const { flag, message, data } = res.data;
      if (flag) {
        Notification.Success(deleteMarjor, `${message}`);
      } else {
        Notification.Error(deleteMarjor, `${data}`);
      }
    })
    .catch((err) => {
      Notification.Error(deleteMarjor, err);
    })
    .finally(() => {
      getMarjor(currentPage.value, query.value);
    });
};

const handleCurrentChange = (page) => {
  currentPage.value = page;
};

const handleCommand = (value) => {
  query.value = value;
};

const handleClose = () => {
  dialogVisible.value = false;
  form.id = "";
  form.cid = "";
  form.marjor = "";
};
</script>

<style lang="scss" scoped>
.marjor {
  display: flex;
  justify-content: center;
}
</style>
