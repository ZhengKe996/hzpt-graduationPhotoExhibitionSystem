<template>
  <el-row>
    <el-col :span="24" class="info-message">
      <infomation-table
        :tableData="tableData"
        :total="dataTotal"
        :collegelist="collegeList"
        @newClick="newClick"
        @editClick="editClick"
        @deleteClick="deleteClick"
        @handleCurrentChange="handleCurrentChange"
        @handleYearChange="handleYearChange"
        @handleCollegeIdChange="handleCollegeIdChange"
      />
    </el-col>
  </el-row>

  <infomartion-form
    :form="form"
    :title="title"
    :dialogVisible="dialogVisible"
    :marjorlist="marjorList"
    :collegelist="collegeList"
    @handleClose="handleClose"
    @handleCancel="handleClose"
    @handleConfirm="handleConfirm"
    @handleCollegeChange="handleCollegeChange"
  />
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import dayjs from "dayjs";
import { INFOMATION, COLLEGE, MARJOR, FINDBYCOLLEGE } from "@/config";
import ownRequest from "@/service";
import Notification from "@/base-ui/Notification";
import InfomationTable from "./Infomation-table.vue";
import InfomartionForm from "./Infomation-form.vue";

const tableData = ref();
const currentPage = ref(1);
const flag = ref("N");
const year = ref();

const collegeId = ref();
const dataTotal = ref();

const dialogVisible = ref(false);
const addInfo = "新增毕业照信息";
const editInfo = "编辑毕业照信息";
const deleteInfo = "删除毕业照信息";
const title = ref("新增毕业照信息");
const collegeList = ref();
const marjorList = ref();

const form = reactive({
  id: "",
  years: "",
  mid: "",
  cid: "",
  cname: "",
  img: [],
});

onMounted(() => {
  getInfomation(currentPage.value, year.value, collegeId.value);
});

watch([currentPage, year, collegeId], () => {
  getInfomation(currentPage.value, year.value, collegeId.value);
});

const getInfomation = (page, year, cid) => {
  ownRequest
    .get({
      url: `${INFOMATION}`,
      params: {
        page: page,
        size: 10,
        year: year,
        cid: cid,
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

  ownRequest
    .get({ url: `${COLLEGE}` })
    .then((res) => {
      const { data } = res.data;
      collegeList.value = data;
    })
    .catch((err) => {
      Notification.Error("请检查网络是否畅通", err);
    });
  getMarjorByCid(1);
};

const getMarjorByCid = (cid) => {
  ownRequest
    .get({ url: `${MARJOR}/${FINDBYCOLLEGE}/${cid}` })
    .then((res) => {
      const { data } = res.data;
      marjorList.value = data;
    })
    .catch((err) => {
      Notification.Error("请检查网络是否畅通", err);
    });
};

const newClick = () => {
  title.value = "新增毕业照信息";
  flag.value = "N";
  dialogVisible.value = true;
};

const editClick = (item) => {
  ownRequest
    .get({ url: `${INFOMATION}/${item}` })
    .then((res) => {
      const { id, years, cid, mid, cname } = res.data.data;
      form.id = id;
      form.years = years;
      form.cid = cid;
      form.mid = mid;
      form.cname = cname;

      title.value = "编辑毕业照信息";
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
      .post({
        url: `${INFOMATION}`,
        data: {
          years: dayjs(form.years).format("YYYY"),
          cid: form.cid,
          mid: form.mid,
          cname: form.cname,
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
        getInfomation(currentPage.value, year.value, collegeId.value);
        handleClose();
      });
    return;
  }
  if (flag.value === "E") {
    ownRequest
      .put({
        url: `${INFOMATION}`,
        data: {
          id: form.id,
          years: dayjs(form.years).format("YYYY"),
          cid: form.cid,
          mid: form.mid,
          cname: form.cname,
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
        getInfomation(currentPage.value, year.value, collegeId.value);
        handleClose();
      });
    return;
  }
};

const deleteClick = (item) => {
  ownRequest
    .delete({ url: `${INFOMATION}/${item}` })
    .then((res) => {
      const { flag, message, data } = res.data;
      if (flag) {
        Notification.Success(deleteInfo, `${message}`);
      } else {
        Notification.Error(deleteInfo, `${message},${data}`);
      }
    })
    .catch((err) => {
      Notification.Error(deleteInfo, err);
    })
    .finally(() => {
      getInfomation(currentPage.value, year.value, collegeId.value);
    });
};

const handleCurrentChange = (page) => {
  currentPage.value = page;
};

const handleCollegeChange = (value) => {
  form.sid = value;
  getMarjorByCid(value);
};

const handleYearChange = (years) => {
  year.value = dayjs(years).format("YYYY");
};
const handleCollegeIdChange = (cid) => {
  collegeId.value = cid;
};
const handleClose = () => {
  dialogVisible.value = false;
  form.id = "";
  form.years = "";
  form.cid = "";
  form.mid = "";
  form.cname = "";
  form.img = [];
};
</script>

<style lang="scss" scoped>
.info-message {
  display: flex;
  justify-content: center;
}
</style>
