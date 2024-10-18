"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import React, { useEffect, useState } from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Breadcrumb, theme } from "antd";
import Link from "next/link";
import AntdContainer from "./survey-content/_component/AntdContainer";

const { Header, Content, Sider, Footer } = Layout;

export default function RootLayout({ children }) {
  const items1 = ["QuizHub", "2", "3"].map((value, key) => ({
    key,
    label: value,
  }));
  const appQuiz = ["ServiceNow Exam", "Onboarding", "xxx"];
  const exams = ["CSA", "CSD"];
  const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
    (icon, index) => {
      const key = String(index + 1);
      return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: appQuiz[index],
        children: new Array(exams.length).fill(null).map((_, j) => {
          const subKey = index * 4 + j + 1;
          return {
            key: subKey,
            label: <Link href={`/question-bank/${exams[j]}`}>{exams[j]}</Link>,
          };
        }),
      };
    }
  );
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <html lang="en">
      <body className="m-0 large-text">
        <AntdContainer>
          <Layout style={{ height: "100vh" }}>
            <Header
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <div className="demo-logo" />
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["0"]}
                items={items1}
                style={{
                  flex: 1,
                  minWidth: 0,
                }}
              />
            </Header>

            <Layout style={{ flex: 1 }}>
              <Sider
                width={200}
                style={{
                  background: colorBgContainer,
                }}
              >
                <Menu
                  mode="inline"
                  defaultSelectedKeys={["1"]}
                  defaultOpenKeys={["sub1"]}
                  style={{
                    height: "100%",
                    borderRight: 0,
                  }}
                  items={items2}
                />
              </Sider>
              <Layout style={{ padding: "0 24px 24px", flex: 1 }}>
                {/* <Breadcrumb
                  style={{
                    margin: "16px 0",
                  }}
                >
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                  <Breadcrumb.Item>List</Breadcrumb.Item>
                  <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb> */}
                <Content
                  style={{
                    padding: 24,
                    margin: 0,
                    flex: 1,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                    overflow: "auto",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    className="contentArea"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    {children}
                  </div>
                </Content>
              </Layout>
            </Layout>
            <Footer
              style={{
                textAlign: "center",
              }}
            >
              ©{new Date().getFullYear()} Created by HCSM
            </Footer>
          </Layout>
        </AntdContainer>
      </body>
    </html>
  );
}
