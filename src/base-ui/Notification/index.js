import { ElNotification } from "element-plus";

export default {
  Success(title, message) {
    ElNotification({
      title: title,
      message: message,
      type: "success",
      offset: 100,
    });
  },
  Warning(title, message) {
    ElNotification({
      title: title,
      message: message,
      type: "warning",
      offset: 100,
    });
  },
  Error(title, message) {
    ElNotification({
      title: title,
      message: message,
      type: "error",
      offset: 100,
    });
  },
};
