import { LIVESTOCK } from "@/src/types/router";


interface livestockRowProps {
  livestock: LIVESTOCK ;
  onEdit: (livestock: LIVESTOCK ) => void;
}

const livestockRow = ({ livestock, onEdit }: livestockRowProps) => {
  return (
    <div data-testid="livestock-row" className="grid grid-cols-3 sm:grid-cols-5 border-b border-stroke dark:border-strokedark">
      <div className="flex items-center gap-3 p-2.5 xl:p-5">
        <p className="hidden text-black dark:text-white sm:block">{livestock.id}</p>
      </div>
      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <p className="text-black dark:text-white">{livestock.count}</p>
      </div>
      <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
        <p className="text-meta-5">{livestock.name}</p>
      </div>
      <div className="flex items-center justify-center p-2.5 xl:p-5">
        <button
          data-testid={`livestock-edit-${livestock.id}`}
          onClick={() => onEdit(livestock)}
          className="text-blue-500 hover:underline dark:text-blue-400"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default livestockRow;
