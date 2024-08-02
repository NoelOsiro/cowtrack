"use client";
import { createClient } from "@/src/utils/supabase/client";
import { useRouter } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex items-center justify-center min-h-screen">
        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="flex flex-col items-center justify-center">
          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="m-auto p-4">
              {children}
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </>
  );
}
