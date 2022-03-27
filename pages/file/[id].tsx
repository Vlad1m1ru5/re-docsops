import type { NextPage } from "next";
import PageLayout from "~/components/page-layout";
import TestFile from "~/components/test-file";
import supabaseClient from "~/configs/supabase-client";

const File: NextPage<{ title: string; markdown: string }> = ({
  title,
  markdown,
}) => {
  return (
    <PageLayout title={title}>
      <TestFile markdown={markdown} />
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

  return { title, markdown };
};

export default File;
