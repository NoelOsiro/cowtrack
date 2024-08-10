import Breadcrumb from "@/src/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import DefaultLayout from "@/src/components/Layouts/DefaultLayout";
import TableFour from "@/src/components/Tables/CountTable";
import CountGrid from "@/src/components/Pages/CountPage";


export const metadata: Metadata = {
  title: "CowTrack | Count",
  description:
    "This is the Customers page of Q3M Wanda",
};




const CountPage = () => {

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Count" />
      <CountGrid />
      <TableFour />
    </DefaultLayout>
  );
};

export default CountPage;
