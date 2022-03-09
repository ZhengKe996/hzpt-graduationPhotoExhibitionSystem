/* 
  根据 process.env.NODE_ENV 区分
    开发环境：development
    生产环境：production
    测试环境：test
*/
let BASE_URL = "";
const TIME_OUT = 10000;
const upload = "http://192.168.1.133:8000/upload";
const IMGURL = "http://192.168.1.133:8089/";
const ERRORIMG =
  "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg";
const COLLEGE = "college";
const MARJOR = "marjor";
const INFOMATION = "infomation";
const FINDBYCOLLEGE = "findByCollege";

if (process.env.NODE_ENV === "development") {
  BASE_URL = "/api";
} else if (process.env.NODE_ENV === "production") {
  BASE_URL = "http://150.158.99.245:8000/";
  // BASE_URL = "http://192.168.1.133:8000/";
  // BASE_URL = "http://127.0.0.1:8000";
} else {
  BASE_URL = "http://150.158.99.245:8000/";
  // BASE_URL = "http://192.168.1.133:8000/";
  // BASE_URL = "http://127.0.0.1:8000";
}

export {
  BASE_URL,
  TIME_OUT,
  upload,
  COLLEGE,
  FINDBYCOLLEGE,
  IMGURL,
  MARJOR,
  INFOMATION,
  ERRORIMG,
};
