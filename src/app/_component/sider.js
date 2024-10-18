import React from "react";
import { Menu } from "antd";

export default function Sider({ items, style }) {
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      style={{
        height: "100%",
        ...style,
      }}
      items={items}
    />
  );
}
