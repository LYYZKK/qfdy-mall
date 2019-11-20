import axios from "axios";

const service = axios.create({
  baseURL: "/api",
  timeout: 60000
});
const err = error => {
  console.log(error.message);
};
// 拦截器
service.interceptors.request.use(config => {
  config.headers["authorization"] =
    "eyJhbGciOiJIUzI1NiJ9.eyJUT0tFTl9VU0VSX05BTUUiOiJtYWxsIiwiVE9LRU5fUkVBTF9OQU1FIjoi5ZWG5Z-OIiwiVE9LRU5fVVNFUl9JRCI6MCwiaWF0IjoxNTcxMTI5Nzk4LCJqdGkiOiIzOGFjM2VlNi1jNzhhLTQzZTMtYTkzNS03ODUzMDMwZjBhNmUiLCJleHAiOjI1MTcyMDk3OTh9.ln_8hhphVCrHoEs51snnesrJJb40_Ix534tgn-43pC8";
  return config;
});
service.interceptors.response.use(response => {
  return response.data;
}, err);
export { service as axios };
