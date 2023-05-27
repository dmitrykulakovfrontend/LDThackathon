import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Index from ".";

function Root({ children }: { children?: React.ReactNode }) {
  const location = useLocation();
  return (
    <div className="relative flex flex-col min-h-screen font-medium bg-white font-manrope">
      <Header />
      {location.pathname === "/" ? (
        <Index />
      ) : (
        <div className="max-w-[1400px] p-5 flex-grow-[4] mx-auto">
          <div className="max-md:mt-[58px]">
            <Outlet />
            {children}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Root;
