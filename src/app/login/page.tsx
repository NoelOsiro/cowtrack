import React from "react";
import { Metadata } from "next";
import AuthLayout from "@/src/components/Layouts/AuthLayout";
import LogoSection from "@/src/components/common/LogoSection";
import SignInForm from "@/src/components/Forms/SignInForm";



export const metadata: Metadata = {
  title: "Q3M Wanda Solutions | Q3M Wanda Solutions",
  description: "Q3M Wanda Solutions",
};

const SignIn: React.FC = () => {
  return (
    <AuthLayout>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <LogoSection />
          <SignInForm />
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignIn;
