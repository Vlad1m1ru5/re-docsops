import {
  ExportOutlined,
  FolderOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Menu, Space } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import type { FC } from "react";

const ROUTES = [
  {
    path: "/",
    element: <FolderOutlined />,
    title: "Explore",
  },
  {
    path: "/upload",
    element: <UploadOutlined />,
    title: "Upload",
  },
  {
    path: "/export",
    element: <ExportOutlined />,
    title: "Export",
  },
];

const PageLayoutNav: FC = () => {
  const { pathname } = useRouter();

  const renderRoutesMenuItems = () =>
    ROUTES.map(({ path, element, title }) => (
      <Menu.Item key={path}>
        <Link href={path}>
          <a href="">
            <Space>
              {element}
              {title}
            </Space>
          </a>
        </Link>
      </Menu.Item>
    ));

  return (
    <Menu mode="inline" defaultSelectedKeys={[pathname]}>
      {renderRoutesMenuItems()}
    </Menu>
  );
};

export default PageLayoutNav;
