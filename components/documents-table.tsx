import useDocuments from "@/hooks/use-documents";
import { Table } from "antd";
import type { FC } from "react";

const DocumentsTable: FC = () => {
  const documents = useDocuments();

  return <Table pagination={false} dataSource={documents} />;
};

export default DocumentsTable;
