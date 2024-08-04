'use client';
import { useState } from "react";
import { CUSTOMER } from "@/types/customer";
import Image from "next/image";
import CustomerRow from "./CustomerRow";
import Pagination from "./Pagination";
import SearchBar from "../FormElements/SearchBar";
import EditModal from "./CustomersModal";
import Loader from "../common/Loader";

interface Props {
  customer: CUSTOMER[] | null;
}

const CustomersTable = (props: Props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState<CUSTOMER | null>(null);
  const itemsPerPage = 10;

  if (!props.customer) {
    return (
      <div className="flex items-center justify-center w-full h-96">
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 w-full">
        <Loader />
        </div>
      </div>
    );
  }

  const filteredCustomers = props.customer.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.alternate_no.includes(searchQuery)
  );

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

  const displayedCustomers = filteredCustomers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEdit = (customer: CUSTOMER) => {
    setSelectedCustomer(customer);
  };

  const handleSave = async (updatedCustomer: CUSTOMER) => {
    try {
      const response = await fetch(`/api/customers/${updatedCustomer.id}?id=${updatedCustomer.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCustomer),
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
        <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
          <div className="p-2.5 xl:p-5"><h5 className="text-sm font-medium uppercase xsm:text-base">Name</h5></div>
          <div className="p-2.5 text-center xl:p-5"><h5 className="text-sm font-medium uppercase xsm:text-base">Phone</h5></div>
          <div className="p-2.5 text-center xl:p-5"><h5 className="text-sm font-medium uppercase xsm:text-base">Location</h5></div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5"><h5 className="text-sm font-medium uppercase xsm:text-base">Account</h5></div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5"><h5 className="text-sm font-medium uppercase xsm:text-base">Activation Date</h5></div>
          <div className="p-2.5 xl:p-5"><h5 className="text-sm font-medium uppercase xsm:text-base">Actions</h5></div>
        </div>

        {displayedCustomers.map((customer, key) => (
          <CustomerRow customer={customer} onEdit={handleEdit} key={key} />
        ))}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {selectedCustomer && (
        <EditModal
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default CustomersTable;
