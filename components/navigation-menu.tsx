import { Menu } from "antd";
import Link from "next/link";
import type { FC } from "react";

const NavigationMenu: FC = () => {
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
