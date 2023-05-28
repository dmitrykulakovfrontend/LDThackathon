import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Index from ".";

/**
 * Корневой элемент который отображает всю разметку страницы включая header, footer и остальные компоненты
 *
 * Так как главная страница требует уникальную разметку то для нее отдельное условие рендера что бы не было ограничения в 1400px
 */
function Root({ children }: { children?: React.ReactNode }) {
  const location = useLocation();
  return (
    <div className="relative flex flex-col min-h-screen font-medium bg-white font-manrope">
      <Header />
      {location.pathname === "/" ? (
        <Index />
      ) : (
        <div className="max-w-[1400px] p-5 flex-grow-[4] w-full mx-auto">
          <div className="max-md:mt-[72px]">
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
