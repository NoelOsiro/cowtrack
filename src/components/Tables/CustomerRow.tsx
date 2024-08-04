import { CUSTOMER } from "@/types/customer";

interface CustomerRowProps {
  customer: CUSTOMER;
  onEdit: (customer: CUSTOMER) => void;
}

const CustomerRow = ({ customer, onEdit }: CustomerRowProps) => {
  return (
    <div data-testid="customer-row" className="grid grid-cols-3 sm:grid-cols-6 border-b border-stroke dark:border-strokedark">
      <div className="flex items-center gap-3 p-2.5 xl:p-5">
        <p className="hidden text-black dark:text-white sm:block">{customer.name}</p>
      </div>
      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <p className="text-black dark:text-white">{customer.alternate_no}</p>
      </div>
      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <p className="text-meta-3">{customer.location}</p>
      </div>
      <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
        <p className="text-black dark:text-white">{customer.router_id}</p>
      </div>
      <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
        <p className="text-meta-5">{customer.activation_date}</p>
      </div>
      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <button
        data-testid={`customer-edit-${customer.id}`}
          onClick={() => onEdit(customer)}
          className="text-blue-500 hover:underline dark:text-blue-400"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default CustomerRow;
