<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    width="30%"
    :before-close="handleClose"
  >
    <el-form :model="props.form" label-width="100px">
      <el-form-item
        v-if="props.form.id != '' && props.form.id != null"
        label="毕业照ID"
      >
        <el-input :disabled="true" v-model="props.form.id"></el-input>
      </el-form-item>
      <el-form-item label="毕业时间">
        <el-date-picker
          v-model="props.form.years"
          type="year"
          placeholder="请选择毕业时间"
          format="YYYY"
        />
      </el-form-item>

      <el-form-item label="所属学院">
        <el-select
          v-model="props.form.cid"
          class="m-2"
          placeholder="请选择二级学院"
          size="large"
          @change="handleCollegeChange"
        >
          <el-option
            v-for="item in props.collegelist"
            :key="item.id"
            :label="item.college"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="所属专业">
        <el-select
          v-model="props.form.sid"
          class="m-2"
          placeholder="请选择专业"
          size="large"
        >
          <el-option
            v-for="item in props.subjectlist"
            :key="item.id"
            :label="item.subject"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="上传毕业照">
        <el-upload
          class="upload-demo"
          :action="uploadUrl"
          method="post"
          name="files"
          :multiple="true"
          :limit="2"
          :on-success="handleSuccess"
        >
          <el-button type="primary">点我上传毕业照</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleConfirm">创建</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmit } from "vue";
import Notification from "@/base-ui/Notification";
import { upload } from "@/config";
const props = defineProps({
  form: Object,
  dialogVisible: Boolean,
  title: String,
  collegelist: Array,
  subjectlist: Array,
});
const uploadUrl = upload;

const emit = defineEmit([
  "handleClose",
  "handleConfirm",
  "handleCancel",
  "handleCollegeChange",
]);
const handleClose = () => {
  emit("handleClose");
};
const handleConfirm = () => {
  emit("handleConfirm");
};
const handleCancel = () => {
  emit("handleCancel");
};

const handleCollegeChange = (value) => {
  emit("handleCollegeChange", value);
};

const handleSuccess = (response) => {
  if (response.flag) {
    props.form.img.push({
      url: response.data[0].url,
    });
    Notification.Success("上传毕业照", response.message);
  } else {
    Notification.Error("上传毕业照", response.message);
  }
};
</script>
