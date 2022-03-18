import { Space } from "antd";
import type { FC } from "react";
import { useEffect, useState } from "react";
import supabaseClient from "~/configs/supabase-client";
import TestDownloadButton from "./test-download-button";

interface TestDownloadButtonProps {
  href: string;
  title: string;
}

const TestDownload: FC<{ id: string; extensions: string[] }> = ({
  id,
  extensions,
}) => {
  const [exports, setExports] = useState<TestDownloadButtonProps[]>([]);

  useEffect(() => {
    const handleAsync = async () => {
      const titles = extensions.map((e) => `${id}.${e}`);

      const requests = titles.map((t) => {
        return supabaseClient.storage.from("test").getPublicUrl(t);
      });

      const responses = await Promise.all(requests);
      const exports = responses.reduce((exps, r, i) => {
        const { error, data } = r;
        if (error || !data) return exps;
        return [...exps, { title: titles[i], href: data.publicURL }];
      }, [] as TestDownloadButtonProps[]);

      setExports(exports);
    };

    handleAsync();
  }, [id, extensions]);

  const renderTestDownloadButtons = () => {
    return exports.map(({ title, href }) => (
      <TestDownloadButton key={href} href={href}>
        {title}
      </TestDownloadButton>
    ));
  };

  return <Space>{renderTestDownloadButtons()}</Space>;
};

export default TestDownload;
