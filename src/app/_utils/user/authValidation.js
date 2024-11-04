import { isTokenValid, clearToken } from "@/app/question-bank/utils/auth";
import { message } from "antd";

export function authValidation() {
  const token = localStorage.getItem("auth_token");

  if (!isTokenValid()) {
    message.warning("Session expired. Please log in again.");
    clearToken();
    return false;
  } else return token;
}
