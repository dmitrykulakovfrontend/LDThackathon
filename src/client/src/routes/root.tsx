import Header from "@/components/Header";
import React from "react";
import { Outlet } from "react-router-dom";

function Root({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative min-h-screen font-medium bg-white font-manrope">
      <Header />
      <div className="max-w-[1400px] p-5 mx-auto">
        <div className="max-md:mt-[58px]">
          <Outlet />
          {children}
        </div>
      </div>
    </div>
  );
}

export default Root;
