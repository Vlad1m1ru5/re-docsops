import { Form } from "antd";

const useUpload = () => {
  const [form] = Form.useForm<{ upload: any }>();

  const customRequest = ({
    onSuccess,
  }: {
    onSuccess?: (body: unknown) => void;
  }) => onSuccess && onSuccess("ok");

  const getValueFromEvent = (event: any) => {
    if (Array.isArray(event)) {
      return event;
    }

    return event && event.fileList;
  };

  return { form, customRequest, getValueFromEvent };
};

export default useUpload;
