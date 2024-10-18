export async function fetchQuestions(url, token) {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // 请求已发出，但服务器响应状态码不在2xx范围内
      const errorData = await response.json();
      console.log("Error:", errorData);
      console.log("Status:", response.status);
      console.log("Headers:", response.headers);
      throw new Error(`Failed to fetch questions from ${url}`);
    }

    const data = await response.json();
    console.log("Success:", data);
    return data;
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
}
