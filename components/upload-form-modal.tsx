import useModal from "@/hooks/use-modal";
import useUpload from "@/hooks/use-upload";
import { InboxOutlined } from "@ant-design/icons";
import { Button, Form, Modal, Upload } from "antd";
import type { FC } from "react";

const UploadFormModal: FC = () => {
  const modal = useModal();
  const upload = useUpload();

  const handleFinish = ({ upload }: { upload?: any }) => {
    const files = Array.isArray(upload) ? upload : [upload];

    const formData = files?.reduce((formData, file) => {
      if (file.originFileObj) {
        formData.append("upload", file.originFileObj, file.name);
      }
      return formData;
    }, new FormData());

    const options = {
      method: "POST",
      body: formData,
    };

    fetch("/api/files", options);
  };

  const modalOnOk = () => {
    upload.form.validateFields().then((values) => {
      upload.form.resetFields();
      handleFinish(values);
      modal.toggleVisible();
    });
  };

  return (
    <>
      <Button type="primary" onClick={modal.toggleVisible}>
        Create
      </Button>
      <Modal
        title="New Document"
        visible={modal.visible}
        onOk={modalOnOk}
        onCancel={modal.toggleVisible}
      >
        <Form form={upload.form}>
          <Form.Item
            name="upload"
            valuePropName="fileList"
            rules={[{ required: true }]}
            getValueFromEvent={upload.getValueFromEvent}
          >
            <Upload.Dragger multiple customRequest={upload.customRequest}>
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
        </Form>
      </Modal>
    </>
  );
};

export default UploadFormModal;
