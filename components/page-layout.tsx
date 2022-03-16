import { Layout, PageHeader } from "antd";
import type { FC } from "react";
import styles from "~/styles/page-layout.module.css";
import PageLayoutHead from "./page-layout-head";
import PageLayoutHome from "./page-layout-home";
import PageLayoutNav from "./page-layout-nav";

const PageLayout: FC<{ title: string }> = ({ title, children }) => {
  return (
    <Layout className={styles.pageLayout}>
      <PageLayoutHead title={title} />
      <Layout.Header className={styles.pageLayoutHeader}>
        <PageLayoutHome />
      </Layout.Header>
      <Layout>
        <Layout.Sider theme="light">
          <PageLayoutNav />
        </Layout.Sider>
        <Layout.Content>
          <PageHeader title={title} />
          <Layout className={styles.pageLayoutContent}>{children}</Layout>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default PageLayout;
