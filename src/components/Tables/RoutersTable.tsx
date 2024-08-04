'use client';
import { useState } from "react";
import { ROUTER } from "@/types/router";
import Pagination from "./Pagination";
import SearchBar from "../FormElements/SearchBar";
import RouterRow from "./RouterRow";
import EditRouterModal from "./RoutersModal";
import Loader from "../common/Loader";

interface Props {
  router: ROUTER[] | null;
}

const CustomersTable = (props: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRouuter, setselectedRouuter] = useState<ROUTER | null>(null);
  const itemsPerPage = 10;

  if (!props.router) {
    return (
      <div className="flex items-center justify-center w-full h-96">
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 w-full">
        <Loader />
        </div>
      </div>
    );
  }

  const filteredRouters = props.router.filter(
    (router) =>
      router.odu_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      router.account_number.includes(searchQuery)
  );

  const totalPages = Math.ceil(filteredRouters.length / itemsPerPage);

  const displayedRouters = filteredRouters.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEdit = (router: ROUTER) => {
    setselectedRouuter(router);
  };

  const handleSave = async (updatedRouter: ROUTER) => {
    try {
      const response = await fetch(`/api/routers/${updatedRouter.id}?id=${updatedRouter.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRouter),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      // Optionally, update the local state or refetch data here
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">Customers</h4>
      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <div className="flex flex-col">
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5"><h5 className="text-sm font-medium uppercase xsm:text-base">Account</h5></div>
          <div className="p-2.5 text-center xl:p-5"><h5 className="text-sm font-medium uppercase xsm:text-base">ODU Number</h5></div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5"><h5 className="text-sm font-medium uppercase xsm:text-base">Date crreated</h5></div>
          <div className="p-2.5 xl:p-5 text-center"><h5 className="text-sm font-medium uppercase xsm:text-base">Actions</h5></div>
        </div>

        {displayedRouters.map((customer, key) => (
          <RouterRow router={customer} onEdit={handleEdit} key={key} />
        ))}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {selectedRouuter && (
        <EditRouterModal
          router={selectedRouuter}
          onClose={() => setselectedRouuter(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default CustomersTable;
