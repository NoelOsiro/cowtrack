import Breadcrumb from "@/src/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/src/components/Layouts/DefaultLayout";
import TableFour from "@/src/components/Tables/CountTable";
import CardDataStats from "@/src/components/Cards/CardDataStats";
import LivestockPage from "@/src/components/Pages/LivestockPage";



export const metadata: Metadata = {
  title: "Livestock | Cattle",
  description:
    "CowTrack is a livestock management system that helps farmers keep track of their livestock.",
};




const CattlePage = () => {

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Livestock" />
      {/* <CountGrid /> */}
      <TableFour />
      <LivestockPage />
    </DefaultLayout>
  );
};

export default CattlePage;
