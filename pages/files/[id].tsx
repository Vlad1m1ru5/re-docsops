import type { NextPage } from "next";
import PageLayout from "~/components/page-layout";
import TestDownload from "~/components/test-download";
import TestPresenter from "~/components/test-presenter";
import supabaseClient from "~/configs/supabase-client";

const File: NextPage<{ id: string; title: string; markdown: string }> = ({
  id,
  title,
  markdown,
}) => {
  return (
    <PageLayout title={title}>
      <TestDownload id={id} extensions={["docx"]} />
      <TestPresenter markdown={markdown} />
    </PageLayout>
  );
};

File.getInitialProps = async ({ query }) => {
  const { id: fileId } = query;

  const id = fileId && !Array.isArray(fileId) ? fileId : "";

  const { data: test } = await supabaseClient
    .from("test")
    .select("data, content")
    .match({ id })
    .single();

  const { data, content: markdown } = test;
  const title = data.title || data.name;

  return { id, title, markdown };
};

export default File;
