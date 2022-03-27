import type { FC } from "react";
import ReactMarkdown from "react-markdown";
import remarkPlugins from "~/configs/remark-plugins";

const TestFile: FC<{ markdown: string }> = ({ markdown }) => {
  return (
    <ReactMarkdown remarkPlugins={remarkPlugins}>{markdown}</ReactMarkdown>
  );
};

export default TestFile;
