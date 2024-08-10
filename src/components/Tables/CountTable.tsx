import React from "react";
import Image from "next/image";
import DropdownDefault from "../Dropdowns/DropdownDefault";
import { BRAND } from "@/src/types/brand";

interface TableProps<T> {
  headers: string[];
  data: T[];
  renderRow: (item: T, index: number) => React.ReactNode;
}
const brandData: BRAND[] = [
  {
    logo: "/images/brand/brand-01.png",
    name: "Bulls",
    visitors: '25-01-2021',
    revenues: "5,768",
    sales: 590,
    conversion: 4.8,
  },
  {
    logo: "/images/brand/brand-02.png",
    name: "Camels",
    visitors: '25-01-2021',
    revenues: "4,635",
    sales: 467,
    conversion: 4.3,
  },
  {
    logo: "/images/brand/brand-03.png",
    name: "Sheep",
    visitors: '25-01-2021',
    revenues: "4,290",
    sales: 420,
    conversion: 3.7,
  },
  {
    logo: "/images/brand/brand-04.png",
    name: "Goats",
    visitors: '25-01-2021',
    revenues: "3,580",
    sales: 389,
    conversion: 2.5,
  },
  {
    logo: "/images/brand/brand-05.png",
    name: "Cows",
    visitors: '25-01-2021',
    revenues: "6,768",
    sales: 390,
    conversion: 4.2,
  },
];

const Table = <T,>({ headers, data, renderRow }: TableProps<T>) => {
  return (
    <div className="col-span-12 xl:col-span-7">
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="mb-6 flex justify-between">
          <h4 className="text-title-sm2 font-bold text-black dark:text-white">
            Latest Count
          </h4>
          <DropdownDefault />
        </div>

        <div className="flex flex-col">
          <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4">
            {headers.map((header, index) => (
              <div
                key={index}
                className={`p-2.5 xl:p-4 ${index > 0 ? "text-center" : ""}`}
              >
                <h5 className="text-sm font-medium uppercase xsm:text-base">
                  {header}
                </h5>
              </div>
            ))}
          </div>

          {data.map((item, index) => renderRow(item, index))}
        </div>
      </div>
    </div>
  );
};

const TableFour: React.FC = () => {
  const headers = ["Animal", "Date", "Count", "Trend"];

  const renderRow = (brand: BRAND, index: number) => (
    <div
      className={`grid grid-cols-4 ${
        index === brandData.length - 1
          ? ""
          : "border-b border-stroke dark:border-strokedark"
      }`}
      key={index}
    >
      <div className="flex items-center gap-3 p-2.5 xl:p-5">
        <div className="h-9 w-full max-w-9 flex-shrink-0">
          <Image src={brand.logo} width={60} height={60} alt="Brand" />
        </div>
        <p className="hidden font-medium text-black dark:text-white sm:block">
          {brand.name}
        </p>
      </div>

      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <p className="font-medium text-black dark:text-white">
          {brand.visitors}</p>
      </div>

      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <p className="font-medium text-meta-3">{brand.revenues}</p>
      </div>

      <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
        <p className="font-medium text-meta-5">{brand.conversion}%</p>
      </div>
    </div>
  );

  return <Table headers={headers} data={brandData} renderRow={renderRow} />;
};

export default TableFour;
