import type { NextPage } from "next";
import PageLayout from "~/components/page-layout";
import TestExport from "~/components/test-export";

const Export: NextPage = () => {
  return (
    <PageLayout title="Export Document">
      <TestExport />
    </PageLayout>
  );
};

export default Export;
