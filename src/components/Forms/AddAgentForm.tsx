"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";

// Validation schema
const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    id: Yup.string().required("ID is required"),
    phone: Yup.string().matches(/^\d{10}$/, "Phone number must be 10 digits").required("Phone number is required"),
    startDate: Yup.string().required("Start date is required"),
});

const AddAgentForm: React.FC = () => {
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            id: "",
            phone: "",
            startDate: "",
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
                <h3 className="font-medium text-black dark:text-white">Add Agent</h3>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className="p-6.5">
                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                First name
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Enter your first name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.firstName}
                                className={`w-full rounded border-[1.5px] ${formik.touched.firstName && formik.errors.firstName ? "border-red-500" : "border-stroke"
                                    } bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                            />
                            {formik.touched.firstName && formik.errors.firstName ? (
                                <div className="text-red-500 mt-2">{formik.errors.firstName}</div>
                            ) : null}
                        </div>

                        <div className="w-full xl:w-1/2">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Last name
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Enter your last name"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.lastName}
                                className={`w-full rounded border-[1.5px] ${formik.touched.lastName && formik.errors.lastName ? "border-red-500" : "border-stroke"
                                    } bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                            />
                            {formik.touched.lastName && formik.errors.lastName ? (
                                <div className="text-red-500 mt-2">{formik.errors.lastName}</div>
                            ) : null}
                        </div>
                    </div>

                    <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                Email <span className="text-meta-1">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email address"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                className={`w-full rounded border-[1.5px] ${formik.touched.email && formik.errors.email ? "border-red-500" : "border-stroke"
                                    } bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="text-red-500 mt-2">{formik.errors.email}</div>
                            ) : null}
                        </div>


                        <div className="w-full xl:w-1/2">
                            <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                ID
                            </label>
                            <input
                                type="text"
                                name="id"
                                placeholder="Enter your ID"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.id}
                                className={`w-full rounded border-[1.5px] ${formik.touched.id && formik.errors.id ? "border-red-500" : "border-stroke"
                                    } bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                            />
                            {formik.touched.id && formik.errors.id ? (
                                <div className="text-red-500 mt-2">{formik.errors.id}</div>
                            ) : null}
                        </div>
                    </div>

                    <div className="mb-4.5">
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                            Phone
                        </label>
                        <input
                            type="text"
                            name="phone"
                            placeholder="Enter your phone number"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phone}
                            className={`w-full rounded border-[1.5px] ${formik.touched.phone && formik.errors.phone ? "border-red-500" : "border-stroke"
                                } bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                        />
                        {formik.touched.phone && formik.errors.phone ? (
                            <div className="text-red-500 mt-2">{formik.errors.phone}</div>
                        ) : null}
                    </div>

                    <div className="mb-4.5">
                        <DatePickerOne
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.startDate}
                        />
                        {formik.touched.startDate && formik.errors.startDate ? (
                            <div className="text-red-500 mt-2">{formik.errors.startDate}</div>
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

export default AddAgentForm;
