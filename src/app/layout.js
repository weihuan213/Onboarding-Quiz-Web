"use client";
import React, { useState } from "react";
import { LaptopOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import Link from "next/link";
import AntdContainer from "./survey-content/_component/AntdContainer";

const { Header, Content, Sider, Footer } = Layout;

export default function RootLayout({ children }) {
  const items1 = ["QuizHub"].map((value, key) => ({
    key,
    label: value,
  }));

  const appQuiz = [
    { name: "Quiz", categories: ["Onboarding Quiz"] },
    { name: "Practice", categories: ["CSA"] },
  ];

  const items2 = [UserOutlined, LaptopOutlined].map((icon, index) => {
    const { name, categories } = appQuiz[index];
    const key = `sub${index + 1}`;

    return {
      key,
      icon: React.createElement(icon),
      label: name,
      children: categories.map((category, j) => {
        const linkRef =
          index === 0 && j === 0
            ? `/question-bank/CSA`
            : `/practice/${category}`;
        return {
          key: `${key}-${j + 1}`,
          label: <Link href={linkRef}>{category}</Link>,
        };
      }),
    };
  });

  const defaultOpenKeys = items2.map((item) => item.key);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [selectedKeys, setSelectedKeys] = useState(["1-1"]);

  const handleMenuClick = (e) => {
    setSelectedKeys([e.key]);
  };

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          height: "100vh",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AntdContainer>
          <Layout style={{ minHeight: "100vh", overflow: "hidden" }}>
            {/* 顶部导航栏 */}
            <Header
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#001529",
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
              {/* 左侧菜单栏 */}
              <Sider width={250} style={{ background: colorBgContainer }}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={["1"]}
                  defaultOpenKeys={defaultOpenKeys}
                  selectedKeys={selectedKeys}
                  onClick={handleMenuClick}
                  items={items2}
                  style={{
                    height: "100%",
                    borderRight: 0,
                  }}
                  className="sider-menu"
                />
              </Sider>

              {/* 主要内容区域 */}
              <Layout style={{ padding: "0 24px 24px", flex: 1 }}>
                <Content
                  style={{
                    padding: 10,
                    margin: 0,
                    flex: 1,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* 固定顶部区域：计时器和进度条 */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingBottom: "10px",
                      borderBottom: "1px solid #ddd",
                    }}
                  >
                    {/* Timer and progress bar go here */}
                  </div>

                  {/* 可滚动的表单区域 */}
                  <div
                    style={{
                      overflowY: "auto",
                      flex: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      padding: "20px",
                      width: "100%",
                      fontSize: "clamp(14px, 2vw, 22px)", // 动态字体大小
                      lineHeight: "1.6", // 增加阅读性
                    }}
                    className="form-container"
                  >
                    {children}
                  </div>
                </Content>
              </Layout>
            </Layout>

            {/* 页脚 */}
            <Footer
              style={{
                textAlign: "center",
                backgroundColor: colorBgContainer,
              }}
            >
              ©{new Date().getFullYear()} Created by HCSM
            </Footer>
          </Layout>
        </AntdContainer>

        {/* 全局样式 */}
        <style jsx global>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          html,
          body {
            height: 100%;
            overflow: hidden;
          }

          .sider-menu .ant-menu-item,
          .sider-menu .ant-menu-submenu-title {
            white-space: normal;
            word-break: break-word;
            overflow: visible;
          }

          .form-container {
            // text-align: center; /* 文字居中对齐 */
          }
        `}</style>
      </body>
    </html>
  );
}
