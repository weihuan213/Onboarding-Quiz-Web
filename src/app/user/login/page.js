"use client";
import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { login } from "../_utils/api";
import { useRouter } from "next/navigation"; // 使用 next/router

const TOKEN_EXPIRATION = 24 * 60 * 60 * 1000; // 1天的毫秒数

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const data = await login(values.username, values.password);

      if (data.error_message === "success") {
        const token = data.token;

        // 存储 token 和创建时间到 localStorage
        const now = new Date().getTime();
        localStorage.setItem("auth_token", token);
        localStorage.setItem("auth_token_timestamp", now.toString());

        router.push("/"); // 跳转到首页
      } else {
        console.log(data.error_message);
      }
    } catch (error) {
      console.error("Login Error:", error);
      message.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        alignItems: "center",
      }}
    >
      <Form
        name="login"
        layout="vertical"
        style={{ width: 400 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label={
            <span style={{ fontSize: "18px", fontWeight: 500 }}>Username</span>
          }
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            size="large"
            placeholder="Enter your username"
            style={{ borderRadius: "8px" }}
          />
        </Form.Item>

        <Form.Item
          label={
            <span style={{ fontSize: "18px", fontWeight: 500 }}>Password</span>
          }
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            size="large"
            placeholder="Enter your password"
            style={{ borderRadius: "8px" }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            size="large"
            style={{ borderRadius: "8px" }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
