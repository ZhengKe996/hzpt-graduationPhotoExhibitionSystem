import axios from "axios";

import { ElLoading } from "element-plus";

const DEFAULT_LOADING = true; // 定义常量，需要修改时方便

class OwnRequest {
  instance;
  interceptors;
  ElLoading;
  showLoading;

  constructor(config) {
    // 创建 axios 实例
    this.instance = axios.create(config);

    // 保存基本信息
    this.interceptors = config.interceptors;
    this.showLoading = config.showLoading ?? DEFAULT_LOADING;

    /* 添加全局的拦截器 */
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: "数据正在请求中",
            background: "rgba(123,123,123,0.5)",
          });
        }

        return config;
      },
      (error) => {
        return error;
      }
    );

    this.instance.interceptors.response.use(
      (res) => {
        // 移除loading
        this.loading?.close();

        return res;
      },
      (error) => {
        // 移除loading
        this.loading?.close();
        return error;
      }
    );
  }
  request(config) {
    return new Promise((resolve, reject) => {
      // 单个请求对请求config进行的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      // 判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading;
      }

      this.instance
        .request(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }

          // 恢复其初始化值,这样不会影响下一次的请求
          this.showLoading = DEFAULT_LOADING;

          // 将结果返回出去
          resolve(res);
        })
        .catch((error) => {
          // 恢复其初始化值,这样不会影响下一次的请求
          this.showLoading = DEFAULT_LOADING;

          reject(error);
          return error;
        });
    });
  }

  get(config) {
    return this.request({ ...config, method: "GET" });
  }

  post(config) {
    return this.request({ ...config, method: "POST" });
  }

  put(config) {
    return this.request({ ...config, method: "PUT" });
  }

  patch(config) {
    return this.request({ ...config, method: "PATCH" });
  }
  delete(config) {
    return this.request({ ...config, method: "DELETE" });
  }
}

export default OwnRequest;
