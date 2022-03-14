import useModal from "@/hooks/use-modal";
import useUpload from "@/hooks/use-upload";
import { InboxOutlined } from "@ant-design/icons";
import { Button, Form, Modal, Upload } from "antd";
import { FC, useCallback } from "react";

const UploadFormModal: FC = () => {
  const modal = useModal();
  const upload = useUpload();

  const handleOk = useCallback(() => {
    upload.form.validateFields().then((values) => {
      upload.form.resetFields();
      upload.postFilesFormData(values);
      modal.toggleVisible();
    });
  }, [modal, upload]);

  return (
    <>
      <Button type="primary" onClick={modal.toggleVisible}>
        Create
      </Button>
      <Modal
        title="New Document"
        visible={modal.visible}
        onOk={handleOk}
        onCancel={modal.toggleVisible}
      >
        <Form form={upload.form}>
          <Form.Item
            name={upload.name}
            valuePropName={upload.valueToPropName}
            rules={upload.rules}
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
