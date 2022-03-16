import type { NextPage } from "next";
import PageLayout from "~/components/page-layout";
import TestPresenter from "~/components/test-presenter";
import supabaseClient from "~/configs/supabase-client";

const File: NextPage<{ title: string; markdown: string }> = ({
  title,
  markdown,
}) => {
  return (
    <PageLayout title={title}>
      <TestPresenter markdown={markdown} />
    </PageLayout>
  );
};

File.getInitialProps = async ({ query }) => {
  const { id } = query;

  const { data: test } = await supabaseClient
    .from("test")
    .select("data, content")
    .eq("id", id)
    .single();

  const { data, content: markdown } = test;
  const title = data.title || data.name;

  return { title, markdown };
};

export default File;
