<template>
  <div class="info-message">
    <info-message-table
      :tableData="tableData"
      :total="dataTotal"
      class="info-message-table"
      @newClick="newClick"
      @editClick="editClick"
      @deleteClick="deleteClick"
      @handleCurrentChange="handleCurrentChange"
      @handleYearChange="handleYearChange"
    />
  </div>

  <info-message-form
    :form="form"
    :title="title"
    :dialogVisible="newDialog"
    :collegelist="collegeList"
    :subjectlist="subjectList"
    @handleClose="handleClose"
    @handleCancel="handleClose"
    @handleConfirm="newHandleConfirm"
    @handleCollegeChange="handleCollegeChange"
  />

  <info-message-form
    :form="form"
    :title="title"
    :dialogVisible="editDialog"
    :collegelist="collegeList"
    :subjectlist="subjectList"
    @handleClose="handleClose"
    @handleCancel="handleClose"
    @handleConfirm="editHandleConfirm"
    @handleCollegeChange="handleCollegeChange"
  />
</template>

<script setup>
import { ref, reactive, onMounted, watch, nextTick } from "vue";
import dayjs from "dayjs";
import ownRequest from "@/service";
import Notification from "@/base-ui/Notification";
import { INFO, FINDPAGE, COLLEGE, SUBJECTFINDBYCOLLEGE } from "@/config";
import InfoMessageTable from "./InfoMessage-table.vue";
import InfoMessageForm from "./InfoMessage-form.vue";

onMounted(() => {
  getInfoMessage(currentPage.value, query.value);
});
const tableData = ref();
const currentPage = ref(1);
const query = ref("");
watch([currentPage, query], () => {
  getInfoMessage(currentPage.value, query.value);
});

const collegeList = ref();
const subjectList = ref();
const getInfoMessage = (page, condition) => {
  ownRequest
    .get({
      url: `${INFO}/${FINDPAGE}`,
      params: {
        size: 10,
        page: page,
        year: condition,
      },
    })
    .then((res) => {
      const { total, rows } = res.data.data;
      dataTotal.value = total;
      tableData.value = rows;
    });

  ownRequest.get({ url: `${COLLEGE}` }).then((res) => {
    const { data } = res.data;
    collegeList.value = data;
  });
};

const getSubjectByCid = (cid) => {
  ownRequest.get({ url: `${SUBJECTFINDBYCOLLEGE}/${cid}` }).then((res) => {
    const { data } = res.data;
    subjectList.value = data;
  });
};

const dataTotal = ref();
const title = ref("新增毕业照信息");
const newDialog = ref(false);
const editDialog = ref(false);
const addInfo = "新增毕业照信息";
const editInfo = "编辑毕业照信息";
const deleteInfo = "删除毕业照信息";

const form = reactive({
  id: "",
  years: "",
  sid: "",
  cid: "",
  img: [],
});

const newClick = () => {
  newDialog.value = true;
  title.value = addInfo;
};

const newHandleConfirm = () => {
  ownRequest
    .post({
      url: `${INFO}`,
      data: {
        years: dayjs(form.years).format("YYYY"),
        cid: form.cid,
        sid: form.sid,
        img: JSON.stringify(form.img),
      },
    })
    .then((res) => {
      const { flag, message } = res.data;
      if (flag) {
        Notification.Success(addInfo, message);
      } else {
        Notification.Error(addInfo, message);
      }
    })
    .catch((err) => {
      Notification.Error(addInfo, err);
    })
    .finally(() => {
      getInfoMessage(currentPage.value, query.value);
      handleClose();
    });
};

const editClick = (item) => {
  ownRequest.get({ url: `${INFO}/${item}` }).then((res) => {
    const { id, cid, sid, years } = res.data.data;
    getSubjectByCid(cid);
    nextTick(() => {
      form.id = id;
      form.cid = cid;
      form.sid = sid;
      form.years = years;
      title.value = editInfo;
      editDialog.value = true;
    });
  });
};

const editHandleConfirm = () => {
  ownRequest
    .put({
      url: `${INFO}`,
      data: {
        id: form.id,
        years: dayjs(form.years).format("YYYY"),
        cid: form.cid,
        sid: form.sid,
        img: JSON.stringify(form.img),
      },
    })
    .then((res) => {
      const { flag, message } = res.data;
      if (flag) {
        Notification.Success(editInfo, message);
      } else {
        Notification.Error(editInfo, message);
      }
    })
    .catch((err) => {
      Notification.Error(editInfo, err);
    })
    .finally(() => {
      getInfoMessage(currentPage.value, query.value);
      handleClose();
    });
};

const deleteClick = (item) => {
  ownRequest
    .delete({ url: `${INFO}/${item}` })
    .then((res) => {
      const { flag, message, data } = res.data;
      if (flag) {
        Notification.Success(deleteInfo, `${message}`);
      } else {
        Notification.Error(deleteInfo, `${message},${data}`);
      }
    })
    .catch((err) => {
      Notification.Error(deleteInfo, `${err}`);
    })
    .finally(() => {
      getInfoMessage(currentPage.value, query.value);
    });
};

const handleCurrentChange = (page) => {
  currentPage.value = page;
};

const handleCollegeChange = (value) => {
  form.sid = "";
  getSubjectByCid(value);
};

const handleYearChange = (year) => {
  query.value = dayjs(year).format("YYYY");
};

const handleClose = () => {
  newDialog.value = false;
  editDialog.value = false;
  form.id = "";
  form.years = "";
  form.sid = "";
  form.cid = "";
};
</script>

<style lang="scss" scoped>
.info-message {
  display: flex;
  justify-content: center;

  .info-message-table {
    margin-top: 40px;
    width: 1200px;
  }
}
</style>
