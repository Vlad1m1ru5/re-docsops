import supabaseClient from "@/configs/supabase-client";
import styles from "@/styles/data-table.module.css";
import { InboxOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Modal, Space, Spin, Table, Upload } from "antd";
import { FC, useEffect, useState } from "react";

const DataTable: FC = () => {
  const [formInstance] = Form.useForm();
  const [spinSpinning, setSpinSpinning] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [tableDataSource, setTableDataSource] = useState<any[]>([]);

  useEffect(() => {
    const handleAsync = async () => {
      try {
        const { data } = await supabaseClient.from("test").select("data");
        setTableDataSource(data ?? []);
      } catch (error) {
        console.error(error);
      }
    };

    handleAsync();
  }, []);

  const handleCreate = () => {
    if (!spinSpinning) setModalVisible(true);
  };

  const handleCancel = () => {
    formInstance.resetFields();
    if (!spinSpinning) setModalVisible(false);
  };

  const normFile = (event: any) => {
    if (Array.isArray(event)) {
      return event;
    }

    return event && event.fileList;
  };

  const handleSubmit = async () => {
    setSpinSpinning(true);

    try {
      const { upload } = await formInstance.validateFields();
      const [file] = upload;

      const formData = new FormData();
      formData.append("file", file.originFileObj);

      const options = { method: "POST", body: formData };
      const res = await fetch("/api/file", options);

      if (res.status !== 200) throw new Error(res.statusText);
      const data = await res.json();

      handleCancel();
      if (Array.isArray(data)) setTableDataSource(data);
    } catch (error) {
      console.error(error);
    } finally {
      setSpinSpinning(false);
    }
  };

  const dummyRequest = (options: any) =>
    options.onSuccess && options.onSuccess(true);

  return (
    <Space direction="vertical" className={styles.wrapper}>
      <Button type="primary" onClick={handleCreate}>
        <PlusOutlined />
        Create
      </Button>
      <Table dataSource={tableDataSource}>
        <Table.Column title="Name" dataIndex="name" />
      </Table>
      <Modal
        title="New Document"
        visible={modalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <Spin spinning={spinSpinning}>
          <Form form={formInstance}>
            <Form.Item
              name="upload"
              rules={[{ required: true, message: "Please upload file" }]}
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload.Dragger maxCount={1} customRequest={dummyRequest}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">Support for a single upload.</p>
              </Upload.Dragger>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </Space>
  );
};

export default DataTable;
