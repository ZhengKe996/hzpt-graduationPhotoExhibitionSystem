<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    width="30%"
    :before-close="handleClose"
  >
    <el-form :model="props.form" label-width="80px">
      <el-form-item
        v-if="props.form.id != '' && props.form.id != null"
        label="专业ID:"
      >
        <el-input :disabled="true" v-model="props.form.id"></el-input>
      </el-form-item>
      <el-form-item label="所属学院">
        <el-select
          v-model="props.form.cid"
          class="m-2"
          placeholder="请选择二级学院"
          size="large"
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

      <el-form-item label="专业名">
        <el-input v-model="props.form.subject"></el-input>
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
const props = defineProps({
  form: Object,
  dialogVisible: Boolean,
  title: String,
  collegelist: Array,
});

const emit = defineEmit(["handleClose", "handleConfirm", "handleCancel"]);
const handleClose = () => {
  emit("handleClose");
};
const handleConfirm = () => {
  emit("handleConfirm");
};
const handleCancel = () => {
  emit("handleCancel");
};
</script>

<style lang="scss" scoped></style>
