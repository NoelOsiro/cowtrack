import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FormContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
        <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
            <ToastContainer />
            <span className="mb-1.5 block font-medium">Log In</span>
            <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                CowTrack
            </h2>
            {children}
        </div>
    </div>
);

export default FormContainer;
