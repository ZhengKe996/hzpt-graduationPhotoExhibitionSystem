<template>
  <el-page-header :content="props.detail" />
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  detail: String,
});
</script>

<style lang="scss" scoped></style>
