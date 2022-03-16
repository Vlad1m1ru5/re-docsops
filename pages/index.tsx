import type { NextPage } from "next";
import PageLayout from "~/components/page-layout";
import TestExplorer from "~/components/test-explorer";

const Home: NextPage = () => {
  return (
    <PageLayout title="My Documents">
      <TestExplorer />
    </PageLayout>
  );
};

export default Home;
