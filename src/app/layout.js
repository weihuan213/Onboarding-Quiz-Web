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

  // State to keep track of the selected keys
  const [selectedKeys, setSelectedKeys] = useState(["1-1"]); // Set initial selected key (Onboarding Quiz)

  const handleMenuClick = (e) => {
    console.log(e.key);
    setSelectedKeys([e.key]);
  };

  return (
    <html lang="en">
      <body>
        <AntdContainer>
          <Layout style={{ minHeight: "100vh", overflow: "hidden" }}>
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
              <Sider width={250} style={{ background: colorBgContainer }}>
                <Menu
                  mode="inline"
                  defaultSelectedKeys={["1"]}
                  defaultOpenKeys={defaultOpenKeys}
                  selectedKeys={selectedKeys} // Pass the selectedKeys state
                  onClick={handleMenuClick} // Handle menu click
                  items={items2}
                  style={{
                    height: "100%",
                    borderRight: 0,
                  }}
                  className="sider-menu"
                />
              </Sider>
              <Layout style={{ padding: "0 24px 24px", flex: 1 }}>
                <Content
                  style={{
                    padding: 10,
                    margin: 0,
                    flex: 1,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
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
                backgroundColor: colorBgContainer,
              }}
            >
              ©{new Date().getFullYear()} Created by HCSM
            </Footer>
          </Layout>
        </AntdContainer>

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
        `}</style>
      </body>
    </html>
  );
}
