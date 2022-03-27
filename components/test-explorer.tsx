import { SearchOutlined } from "@ant-design/icons";
import { Space, Table } from "antd";
import Link from "next/link";
import type { FC } from "react";
import { useEffect, useState } from "react";
import supabaseClient from "~/configs/supabase-client";

const TestExplorer: FC = () => {
  const [shouldFetch, setShouldFetch] = useState(true);
  const [testData, setTestData] = useState<any[]>([]);

  useEffect(() => {
    const handleAsync = async () => {
      const { data } = await supabaseClient.from("test").select("id, data");
      if (data) setTestData(data);
      setShouldFetch(false);
    };

    if (shouldFetch) handleAsync();
  }, [shouldFetch]);

  const renderAction = (id: string) => (
    <Link href={`/file/${id}`}>
      <a href="">
        <Space size={4}>
          <SearchOutlined />
          Explore
        </Space>
      </a>
    </Link>
  );

  return (
    <Table dataSource={testData}>
      <Table.Column title="Name" dataIndex={["data", "name"]} />
      <Table.Column
        title="Action"
        dataIndex="id"
        render={renderAction}
        width="0"
      />
    </Table>
  );
};

export default TestExplorer;
