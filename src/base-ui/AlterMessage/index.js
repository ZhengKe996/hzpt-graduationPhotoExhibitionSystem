import { ElMessage } from "element-plus";

export default {
  Success(message) {
    ElMessage({
      center: true,
      message: message,
      type: "success",
    });
  },
  Warning(message) {
    ElMessage({
      center: true,
      message: message,
      type: "warning",
    });
  },
  Error(message) {
    ElMessage({
      center: true,
      message: message,
      type: "error",
    });
  },
};
