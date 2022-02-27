/* 
  根据 process.env.NODE_ENV 区分
    开发环境：development
    生产环境：production
    测试环境：test
*/
let BASE_URL = "";
const TIME_OUT = 10000;
const upload = "http://127.0.0.1:8080/librarySystem/info/upload";
const IMGURL = "http://127.0.0.1:8089";
const COLLEGE = "college";
const SUBJECT = "subject";
const FINDPAGE = "findPage";
const INFO = "info";
const SUBJECTFINDBYCOLLEGE = "subject/findByCollege";

if (process.env.NODE_ENV === "development") {
  BASE_URL = "/api";
} else if (process.env.NODE_ENV === "production") {
  // BASE_URL = "http://192.168.1.133:8080/librarySystem/";
  BASE_URL = "http://127.0.0.1:8080/librarySystem";
} else {
  // BASE_URL = "http://192.168.1.133:8080/librarySystem/";
  BASE_URL = "http://127.0.0.1:8080/librarySystem";
}

export {
  BASE_URL,
  TIME_OUT,
  upload,
  COLLEGE,
  SUBJECT,
  FINDPAGE,
  INFO,
  SUBJECTFINDBYCOLLEGE,
  IMGURL,
};
