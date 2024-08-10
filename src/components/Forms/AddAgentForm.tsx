"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePickerOne from "@/src/components/FormElements/DatePicker/DatePickerOne";

// Validation schema
const validationSchema = Yup.object({
    animalId: Yup.string().required("Animal ID is required"),
    type: Yup.string().required("Type is required"),
    breed: Yup.string().required("Breed is required"),
    weight: Yup.number().required("Weight is required").min(0, "Weight must be positive"),
    age: Yup.number().required("Age is required").min(0, "Age must be positive"),
    healthStatus: Yup.string().required("Health status is required"),
    acquisitionDate: Yup.string().required("Acquisition date is required"),
});

const AddLivestockForm: React.FC = () => {
    const formik = useFormik({
        initialValues: {
            animalId: "",
            type: "",
            breed: "",
            weight: "",
            age: "",
            healthStatus: "",
            acquisitionDate: "",
        },
        validationSchema,
        onSubmit: (values) => {
            // Handle form submission
            console.log("Form values:", values);
        },
    });

    return (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">Add Livestock</h3>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className="p-6.5">
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Animal ID
                            </label>
                            <input
                                type="text"
                                name="animalId"
                                placeholder="Enter Animal ID"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.animalId}
                                className={`w-full rounded border-[1.5px] ${formik.touched.animalId && formik.errors.animalId ? "border-red-500" : "border-stroke"} bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                            />
                            {formik.touched.animalId && formik.errors.animalId ? (
                                <div className="text-red-500 mt-2">{formik.errors.animalId}</div>
                            ) : null}
                        </div>

                        <div className="w-full xl:w-1/2">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Type
                            </label>
                            <select
                                name="type"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.type}
                                className={`w-full rounded border-[1.5px] ${formik.touched.type && formik.errors.type ? "border-red-500" : "border-stroke"} bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                            >
                                <option value="" label="Select type" />
                                <option value="Cattle" label="Cattle" />
                                <option value="Sheep" label="Sheep" />
                                <option value="Goat" label="Goat" />
                                {/* Add other types as needed */}
                            </select>
                            {formik.touched.type && formik.errors.type ? (
                                <div className="text-red-500 mt-2">{formik.errors.type}</div>
                            ) : null}
                        </div>
                    </div>

                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Breed
                            </label>
                            <input
                                type="text"
                                name="breed"
                                placeholder="Enter Breed"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.breed}
                                className={`w-full rounded border-[1.5px] ${formik.touched.breed && formik.errors.breed ? "border-red-500" : "border-stroke"} bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                            />
                            {formik.touched.breed && formik.errors.breed ? (
                                <div className="text-red-500 mt-2">{formik.errors.breed}</div>
                            ) : null}
                        </div>
                        <div className="w-full xl:w-1/2">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Weight (kg)
                            </label>
                            <input
                                type="number"
                                name="weight"
                                placeholder="Enter Weight"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.weight}
                                className={`w-full rounded border-[1.5px] ${formik.touched.weight && formik.errors.weight ? "border-red-500" : "border-stroke"} bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                            />
                            {formik.touched.weight && formik.errors.weight ? (
                                <div className="text-red-500 mt-2">{formik.errors.weight}</div>
                            ) : null}
                        </div>
                    </div>
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Age (years)
                            </label>
                            <input
                                type="number"
                                name="age"
                                placeholder="Enter Age"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.age}
                                className={`w-full rounded border-[1.5px] ${formik.touched.age && formik.errors.age ? "border-red-500" : "border-stroke"} bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                            />
                            {formik.touched.age && formik.errors.age ? (
                                <div className="text-red-500 mt-2">{formik.errors.age}</div>
                            ) : null}
                        </div>
                        <div className="w-full xl:w-1/2">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Health Status
                            </label>
                            <input
                                type="text"
                                name="healthStatus"
                                placeholder="Enter Health Status"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.healthStatus}
                                className={`w-full rounded border-[1.5px] ${formik.touched.healthStatus && formik.errors.healthStatus ? "border-red-500" : "border-stroke"} bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                            />
                            {formik.touched.healthStatus && formik.errors.healthStatus ? (
                                <div className="text-red-500 mt-2">{formik.errors.healthStatus}</div>
                            ) : null}
                        </div>

                    </div>
                    <div className="mb-4.5">
                        <DatePickerOne
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.acquisitionDate}
                        />
                        {formik.touched.acquisitionDate && formik.errors.acquisitionDate ? (
                            <div className="text-red-500 mt-2">{formik.errors.acquisitionDate}</div>
                        ) : null}
                    </div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                    >
                        Add Agent
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddLivestockForm;
