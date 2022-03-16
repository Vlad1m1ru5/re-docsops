import { InboxOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import type { FC } from "react";

const TestUpload: FC = () => {
  const beforeUpload = (file: any) => {
    const isMd = String(file?.name).endsWith(".md");
    return isMd || Upload.LIST_IGNORE;
  };

  const customRequest = async (options: any) => {
    if (!options.file) return;

    const data = new FormData();
    data.append("file", options.file);

    const config = { method: "POST", body: data };
    const res = await fetch("/api/file", config);

    if (res.status !== 200) return options.onError(res.statusText);
    return options.onSuccess(await res.json());
  };

  const onRemove = (data: any) => {
    console.log(data);
  };

  return (
    <Upload.Dragger
      multiple
      accept=".md"
      beforeUpload={beforeUpload}
      customRequest={customRequest}
      onRemove={onRemove}
    >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag <b>.md</b> file to this area to upload
      </p>
      <p className="ant-upload-hint">Support for a single or bulk upload.</p>
    </Upload.Dragger>
  );
};

export default TestUpload;
