import useDocumets from "@/hooks/use-documents";
import { Table } from "antd";
import type { FC } from "react";

const DocumentsTable: FC = () => {
  const documents = useDocumets();

  return <Table dataSource={documents} />;
};

export default DocumentsTable;
