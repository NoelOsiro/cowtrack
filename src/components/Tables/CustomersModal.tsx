import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CUSTOMER } from "@/types/customer";

interface EditModalProps {
  customer: CUSTOMER | null;
  onClose: () => void;
  onSave: (updatedCustomer: CUSTOMER) => void;
}

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  alternate_no: Yup.string().required('Phone number is required'),
  location: Yup.string().required('Location is required'),
  email: Yup.string().email('Invalid email address'),
  router_id: Yup.number().required('Required'),
  activation_date: Yup.date().required('Activation date is required').nullable(),
});

const EditModal = ({ customer, onClose, onSave }: EditModalProps) => {
  const formik = useFormik({
    initialValues: {
      id: customer?.id || '',
      name: customer?.name || '',
      alternate_no: customer?.alternate_no || '',
      location: customer?.location || '',
      router_id: customer?.router_id || 0,
      activation_date: customer?.activation_date || '',
      email: customer?.email || '',
    },
    validationSchema,
    onSubmit: (values) => {
      if (customer) {
        onSave({ ...customer, ...values });
      }
      onClose();
    },
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg dark:bg-gray-800">
        <h3 className="text-xl font-semibold mb-4">Edit Customer</h3>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="flex flex-col gap-4 xl:w-1/2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full mt-1 rounded border ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'} dark:border-gray-600 p-2`}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500 text-sm">{formik.errors.name}</div>
              ) : null}
            </div>
            <div className="flex flex-col gap-4 xl:w-1/2">
              <label htmlFor="alternate_no" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
              <input
                type="text"
                id="alternate_no"
                name="alternate_no"
                value={formik.values.alternate_no}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full mt-1 rounded border ${formik.touched.alternate_no && formik.errors.alternate_no ? 'border-red-500' : 'border-gray-300'} dark:border-gray-600 p-2`}
              />
              {formik.touched.alternate_no && formik.errors.alternate_no ? (
                <div className="text-red-500 text-sm">{formik.errors.alternate_no}</div>
              ) : null}
            </div>
          </div>
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="flex flex-col gap-4 xl:w-1/2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full mt-1 rounded border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'} dark:border-gray-600 p-2`}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">{formik.errors.email}</div>
              ) : null}
            </div>
            <div className="flex flex-col gap-4 xl:w-1/2">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formik.values.location}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full mt-1 rounded border ${formik.touched.location && formik.errors.location ? 'border-red-500' : 'border-gray-300'} dark:border-gray-600 p-2`}
              />
              {formik.touched.location && formik.errors.location ? (
                <div className="text-red-500 text-sm">{formik.errors.location}</div>
              ) : null}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="router_id" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Account No</label>
            <input
              type="number"
              id="router_id"
              name="router_id"
              value={formik.values.router_id}
              className={`w-full mt-1 rounded border ${formik.touched.router_id && formik.errors.router_id ? 'border-red-500' : 'border-gray-300'} dark:border-gray-600 p-2`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}             
            />
            {formik.touched.router_id && formik.errors.router_id ? (
                <div className="text-red-500 text-sm">{formik.errors.router_id}</div>
              ) : null
              }
          </div>
          <div className="mb-4">
            <label htmlFor="activation_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Activation Date</label>
            <input
              type="date"
              id="activation_date"
              name="activation_date"
              value={formik.values.activation_date}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full mt-1 rounded border ${formik.touched.activation_date && formik.errors.activation_date ? 'border-red-500' : 'border-gray-300'} dark:border-gray-600 p-2`}
            />
            {formik.touched.activation_date && formik.errors.activation_date ? (
              <div className="text-red-500 text-sm">{formik.errors.activation_date}</div>
            ) : null}
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

export default EditModal;
