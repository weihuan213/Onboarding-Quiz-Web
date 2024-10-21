import axios from "axios";
import config from "../../../../public/config";

const apiClient = axios.create({
  baseURL: config.baseURL,
  timeout: 5000,
});

export const login = async (username, password) => {
  const params = {
    username: "test",
    password: "test123",
  };
  try {
    const response = await apiClient.post("/user/account/token/", null, {
      params,
    });
    console.log(response.data);

    return response.data;
  } catch (error) {
    if (error.response) {
      // 请求已发出，但服务器响应状态码不在2xx范围内
      console.log("Error:", error.response.data);
      console.log("Status:", error.response.status);
      console.log("Headers:", error.response.headers);
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      console.log("Error: No response received");
      console.log("Request:", error.request);
    } else {
      // 其他错误
      console.log("Error:", error.message);
    }
  }
};
