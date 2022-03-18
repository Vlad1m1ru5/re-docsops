import { InboxOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import type { RcFile, UploadFile } from "antd/lib/upload/interface";
import { FC, useEffect, useState } from "react";

const TestUpload: FC = () => {
  const [uploadUidToId] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    return () => uploadUidToId.clear();
  }, [uploadUidToId]);

  const beforeUpload = (file: RcFile) => {
    const isMd = String(file.name).endsWith(".md");
    return isMd || Upload.LIST_IGNORE;
  };

  const customRequest = async (options: any) => {
    if (!options.file) return;

    const formData = new FormData();
    formData.append("file", options.file);
    const config = { method: "POST", body: formData };
    const res = await fetch("/api/files", config);

    if (res.status !== 200) return options.onError(res.statusText);

    const { id } = await res.json();

    if (!id) return options.onError();

    uploadUidToId.set(options.file.uid, id);
    return options.onSuccess("Ok");
  };

  const onRemove = async (file: UploadFile) => {
    const id = uploadUidToId.get(file.uid);

    if (!id) return;

    const config = { method: "DELETE" };
    const res = await fetch(`/api/file/${id}`, config);

    if (res.status !== 204) return;

    uploadUidToId.delete(file.uid);
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
