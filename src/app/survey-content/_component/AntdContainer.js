"use client";
import React from "react";
import { ConfigProvider } from "antd";

export default function AntdContainer({ children }) {
  const theme = {
    token: {
      fontSize: 18,
    },
  };
  return (
    <ConfigProvider theme={theme} componentSize="middle">
      {children}
    </ConfigProvider>
  );
}
