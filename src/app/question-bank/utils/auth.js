export const isTokenValid = () => {
  if (typeof window === "undefined") return false;
  const TOKEN_EXPIRATION = 24 * 60 * 60 * 1000;
  const token = localStorage.getItem("auth_token");
  const timestamp = localStorage.getItem("auth_token_timestamp");

  if (!token || !timestamp) {
    return false; // 如果没有 token 或时间戳，则视为无效
  }

  const now = new Date().getTime();
  const tokenAge = now - parseInt(timestamp, 10); // 计算 token 存在的时间

  return tokenAge < TOKEN_EXPIRATION; // 是否在有效期内
};

export const clearToken = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_token_timestamp");
};
