import { axios } from "./axios";
function request({ url, method = "get", params = {}, urlReplacements = [] }) {
  let reqUrl = url;
  urlReplacements.forEach(replacement => {
    reqUrl = reqUrl.replace(replacement.substr, replacement.replacement);
  });
  if (["post", "patch", "put"].includes(method)) {
    return axios({
      url: reqUrl,
      data: params,
      method
    });
  } else if (["get", "delete"].includes(method)) {
    return axios({
      url: reqUrl,
      params,
      method
    });
  }
}
export default request;
