import DocumentsForm from "@/components/documents-form";
import DocumentsTable from "@/components/documents-table";
import NavigationMenu from "@/components/navigation-menu";
import { Button, Col, Layout, Modal, Row, Typography } from "antd";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

const Home: NextPage = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModalVisible = () => {
    setModalVisible((modalVisible) => !modalVisible);
  };

  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout.Header>
        <Row justify="space-between">
          <Col>
            <NavigationMenu />
          </Col>
          <Col>
            <Button type="primary" onClick={toggleModalVisible}>
              Create
            </Button>
          </Col>
        </Row>
      </Layout.Header>
      <Layout.Content style={{ padding: "24px 50px 0 50px" }}>
        <DocumentsTable />
      </Layout.Content>
      <Modal footer={null} visible={modalVisible} onCancel={toggleModalVisible}>
        <Typography.Title style={{ textAlign: "center" }}>
          New Document
        </Typography.Title>
        <DocumentsForm />
      </Modal>
    </Layout>
  );
};

export default Home;
