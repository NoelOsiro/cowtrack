import React from "react";
import Link from "next/link";
import Image from "next/image";

const LogoSection: React.FC = () => {
  return (
    <div className="hidden w-full xl:block xl:w-1/2">
      <div className="px-26 py-17.5 text-center">
        <Link className="mb-5.5 inline-block" href="/">
          <Image
            className="hidden dark:block"
            src={"/images/logo/logo.png"}
            alt="Logo-dark"
            width={176}
            height={178}
          />
          <Image
            className="dark:hidden"
            src={"/images/logo/logo.png"}
            alt="Logo"
            width={176}
            height={178}
          />
        </Link>

        <p className="2xl:px-10 lg:text-xl">
          Ranch Management System
        </p>
      </div>
    </div>
  );
};

export default LogoSection;
