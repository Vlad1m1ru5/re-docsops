import type { NextPage } from "next";
import PageLayout from "~/components/page-layout";
import TestUpload from "~/components/test-upload";

const Upload: NextPage = () => {
  return (
    <PageLayout title="New Documents">
      <TestUpload />
    </PageLayout>
  );
};

export default Upload;
