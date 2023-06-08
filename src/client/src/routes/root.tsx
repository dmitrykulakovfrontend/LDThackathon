import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Index from ".";
import { useBackground } from "@/contexts/useBackground";

/**
 * Корневой элемент который отображает всю разметку страницы включая header, footer и остальные компоненты
 *
 * Так как главная страница требует уникальную разметку то для нее отдельное условие рендера что бы не было ограничения в 1400px
 */
function Root({ children }: { children?: React.ReactNode }) {
  const location = useLocation();
  const { background, setBackground } = useBackground();
  useEffect(() => {
    setBackground({
      icon: undefined,
      color: "white",
    });
  }, [window.location.pathname]);

  return (
    <div
      className="relative flex flex-col min-h-screen font-medium font-manrope"
      style={{ backgroundColor: background?.color }}
    >
      {background?.icon ? (
        <background.icon className="absolute right-0 z-10 w-1/2 -translate-y-1/2 max-md:hidden h-1/2 top-1/2 opacity-10 text-ldt-red" />
      ) : (
        ""
      )}
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
