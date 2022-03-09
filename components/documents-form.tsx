import { InboxOutlined } from "@ant-design/icons";
import { Button, Form, Upload } from "antd";
import type { FC } from "react";

export interface FormValues {
  files: any[];
}

const DocumentsForm: FC = () => {
  const handleFinish = ({ files }: Partial<FormValues>) => {
    const formData = files?.reduce((formData, { originFileObj }) => {
      formData.append("files", originFileObj);
      return formData;
    }, new FormData());

    const endpoint = "/api/files";
    const options = {
      method: "POST",
      body: formData,
    };

    fetch(endpoint, options);
  };

  const normFile = (event: File[] | { fileList: File[] }) => {
    if (Array.isArray(event)) {
      return event;
    }

    return event && event.fileList;
  };

  return (
    <Form onFinish={handleFinish}>
      <Form.Item
        name="files"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload.Dragger
          customRequest={({ onSuccess }) => onSuccess && onSuccess("ok")}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload.
          </p>
        </Upload.Dragger>
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
};

export default DocumentsForm;
