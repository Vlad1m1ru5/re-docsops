import fetcherService from "@/services/fetcher-service";
import { Form } from "antd";

const NAME = "upload";
const RULES = [{ required: true }];
const VALUE_TO_PROP_NAME = "fileList";

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

  const postFilesFormData = ({ upload }: { upload?: any }) => {
    const files = Array.isArray(upload) ? upload : [upload];

    const formData = files.reduce((formData, file) => {
      if (file.originFileObj && file.name) {
        formData.append(NAME, file.originFileObj, file.name);
      }
      return formData;
    }, new FormData());

    return fetcherService.postFilesFormData(formData);
  };

  return {
    form,
    name: NAME,
    rules: RULES,
    valueToPropName: VALUE_TO_PROP_NAME,
    postFilesFormData,
    customRequest,
    getValueFromEvent,
  };
};

export default useUpload;
