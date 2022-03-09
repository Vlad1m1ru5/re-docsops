import { Menu } from "antd";
import Link from "next/link";
import React from "react";

const NavigationMenu = () => {
  return (
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["/"]}>
      <Menu.Item key="/">
        <Link href="/">
          <a href="">Home</a>
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default NavigationMenu;
