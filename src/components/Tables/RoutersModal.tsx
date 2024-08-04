import { ROUTER } from '@/types/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface EditModalProps {
  router: ROUTER | null;
  onClose: () => void;
  onSave: (updatedRouter: ROUTER) => void;
}

const validationSchema = Yup.object({
  odu_number: Yup.string().required('ODU number is required'),
  account_number: Yup.string().required('Account number is required'),
});

const EditRouterModal = ({ router, onClose, onSave }: EditModalProps) => {
  const formik = useFormik({
    initialValues: {
      odu_number: router?.odu_number || '',
      account_number: router?.account_number || '',
    },
    validationSchema,
    onSubmit: (values) => {
      if (router) {
        onSave({ ...router, ...values });
      }
      onClose();
    },
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg dark:bg-gray-800">
        <h3 className="text-xl font-semibold mb-4">Edit Router</h3>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="flex flex-col gap-4">
              <label htmlFor='odu_number' className="block text-sm font-medium text-gray-700 dark:text-gray-300">ODU Number</label>
              <input
                type="text"
                name="odu_number"
                id="odu_number" // Ensure this matches
                value={formik.values.odu_number}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full mt-1 rounded border ${formik.touched.odu_number && formik.errors.odu_number ? 'border-red-500' : 'border-gray-300'
                  } dark:border-gray-600 p-2`}
              />
              {formik.touched.odu_number && formik.errors.odu_number ? (
                <div className="text-red-500 text-sm">{formik.errors.odu_number}</div>
              ) : null}
            </div>
          </div>
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="flex flex-col gap-4">
              <label htmlFor='account_number' className="block text-sm font-medium text-gray-700 dark:text-gray-300">Account Number</label>
              <input
                type="text"
                name="account_number"
                id="account_number" // Ensure this matches
                value={formik.values.account_number}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full mt-1 rounded border ${formik.touched.account_number && formik.errors.account_number ? 'border-red-500' : 'border-gray-300'
                  } dark:border-gray-600 p-2`}
              />
              {formik.touched.account_number && formik.errors.account_number ? (
                <div className="text-red-500 text-sm">{formik.errors.account_number}</div>
              ) : null}
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded dark:bg-gray-700 dark:text-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRouterModal;
