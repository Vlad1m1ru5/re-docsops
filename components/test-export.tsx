import { Form, Radio, Select } from "antd";
import { useRouter } from "next/router";
import type { FC } from "react";

const EXTENSIONS = ["docx", "pdf"];

const TestExport: FC = () => {
  const router = useRouter();

  const shallowSaveValuesToQuery = (changedValues: unknown) => {
    const { query } = router;
    const mergedQuery = Object.assign(query, changedValues);
    router.replace({ query: mergedQuery }, undefined, { shallow: true });
  };

  const renderExtensionsButtons = () => (
    <Radio.Group defaultValue={EXTENSIONS[0]}>
      {EXTENSIONS.map((ext) => (
        <Radio.Button key={ext} value={ext}>
          .{ext}
        </Radio.Button>
      ))}
    </Radio.Group>
  );

  return (
    <Form onValuesChange={shallowSaveValuesToQuery}>
      <Form.Item name="ext" label="Format">
        {renderExtensionsButtons()}
      </Form.Item>
      <Form.Item name="id" label="Document">
        <Select options={[]} />
      </Form.Item>
    </Form>
  );
};

export default TestExport;
