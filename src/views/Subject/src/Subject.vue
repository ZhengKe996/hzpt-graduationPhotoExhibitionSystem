<template>
  <div class="subject">
    <subject-table
      :tableData="tableData"
      class="subject-table"
      :total="dataTotal"
      :collegelist="collegeList"
      @newClick="newClick"
      @editClick="editClick"
      @deleteClick="deleteClick"
      @handleCurrentChange="handleCurrentChange"
      @handleCommand="handleCommand"
    />
  </div>
  <subject-form
    :form="form"
    :title="title"
    :dialogVisible="newDialog"
    :collegelist="collegeList"
    @handleClose="handleClose"
    @handleCancel="handleClose"
    @handleConfirm="newHandleConfirm"
  />

  <subject-form
    :form="form"
    :title="title"
    :collegelist="collegeList"
    :dialogVisible="editDialog"
    @handleClose="handleClose"
    @handleCancel="handleClose"
    @handleConfirm="editHandleConfirm"
  />
</template>

<script setup>
import { reactive, ref, onMounted, watch } from "vue";
import Notification from "@/base-ui/Notification";
import ownRequest from "@/service";
import { SUBJECT, FINDPAGE } from "@/config";
import SubjectTable from "./Subject-table.vue";
import SubjectForm from "./Subject-form.vue";
onMounted(() => {
  getSubject(currentPage.value, query.value);
});

const currentPage = ref(1);
const query = ref("");
const addSubject = "新增专业";
const editSubject = "编辑专业";
const deleteSubject = "删除专业";

watch([currentPage, query], () => {
  getSubject(currentPage.value, query.value);
});
const tableData = ref();
const dataTotal = ref();
const getSubject = (page, condition) => {
  ownRequest
    .get({
      url: `${SUBJECT}/${FINDPAGE}`,
      params: {
        size: 10,
        page: page,
        query: condition,
      },
    })
    .then((res) => {
      const { total, rows } = res.data.data;
      dataTotal.value = total;
      tableData.value = rows;
    });

  ownRequest.get({ url: `college` }).then((res) => {
    const { data } = res.data;
    collegeList.value = data;
  });
};

const form = reactive({
  id: "",
  subject: "",
  cid: "",
});

const title = ref("新增专业信息");
const newDialog = ref(false);
const editDialog = ref(false);
const collegeList = ref();

const newClick = () => {
  newDialog.value = true;
  title.value = "新增专业信息";
};

const editClick = (item) => {
  ownRequest.get({ url: `${SUBJECT}/${item}` }).then((res) => {
    const { id, cid, subject } = res.data.data;
    form.id = id;
    form.cid = cid;
    form.subject = subject;
    editDialog.value = true;
    title.value = "编辑专业信息";
  });
};

const newHandleConfirm = () => {
  ownRequest
    .post({
      url: `${SUBJECT}`,
      data: {
        cid: form.cid,
        subject: form.subject,
      },
    })
    .then((res) => {
      const { flag, message } = res.data;
      if (flag) {
        Notification.Success(addSubject, message);
      } else {
        Notification.Error(addSubject, message);
      }
    })
    .catch((err) => {
      Notification.Error(addSubject, err);
    })
    .finally(() => {
      getSubject(currentPage.value, query.value);
      handleClose();
    });
};

const editHandleConfirm = () => {
  ownRequest
    .put({
      url: `${SUBJECT}`,
      data: {
        id: form.id,
        cid: form.cid,
        subject: form.subject,
      },
    })
    .then((res) => {
      const { flag, message } = res.data;
      if (flag) {
        Notification.Success(editSubject, message);
      } else {
        Notification.Error(editSubject, message);
      }
    })
    .catch((err) => {
      Notification.Error(editSubject, err);
    })
    .finally(() => {
      getSubject(currentPage.value, query.value);
      handleClose();
    });
};

const deleteClick = (item) => {
  ownRequest
    .delete({ url: `${SUBJECT}/${item}` })
    .then((res) => {
      const { flag, message, data } = res.data;
      if (flag) {
        Notification.Success(deleteSubject, `${message}`);
      } else {
        Notification.Error(deleteSubject, `${message},${data}`);
      }
    })
    .catch((err) => {
      Notification.Error(deleteSubject, `${err}`);
    })
    .finally(() => {
      getSubject(currentPage.value, query.value);
    });
};

const handleCurrentChange = (page) => {
  currentPage.value = page;
};

const handleCommand = (value) => {
  query.value = value;
};

const handleClose = () => {
  newDialog.value = false;
  editDialog.value = false;
  form.id = "";
  form.cid = "";
  form.subject = "";
};
</script>

<style lang="scss" scoped>
.subject {
  display: flex;
  justify-content: center;

  .subject-table {
    margin-top: 40px;
    width: 900px;
  }
}
</style>
