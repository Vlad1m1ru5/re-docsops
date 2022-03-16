import { FolderOutlined, UploadOutlined } from "@ant-design/icons";
import { Menu, Space } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";

const PageLayoutNav: FC = () => {
  const { pathname } = useRouter();

  return (
    <Menu mode="inline" defaultSelectedKeys={[pathname]}>
      <Menu.Item key="/">
        <Link href="/">
          <a href="">
            <Space>
              <FolderOutlined />
              Explore
            </Space>
          </a>
        </Link>
      </Menu.Item>
      <Menu.Item key="/upload">
        <Link href="/upload">
          <a href="">
            <Space>
              <UploadOutlined />
              Upload
            </Space>
          </a>
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default PageLayoutNav;
