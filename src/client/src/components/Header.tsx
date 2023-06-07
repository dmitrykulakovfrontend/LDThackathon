import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import LogoIcon from "@/assets/small-logo.svg";
import MenuIcon from "@/assets/icon-menu.svg";
import User from "@/assets/user.svg";
import { useJwt } from "react-jwt";
import { Token } from "@/types/auth";
import { useAuth } from "@/contexts/useAuth";

/**
 * Шапка сайта в которой происходит вся авторизация из локального хранилища пользователя
 * @returns {any}
 */
function Header() {
  async function handleLogout() {
    // const res = await fetch(`${API_URL}/auth/logout`);
    // if (res.ok) {
    //   navigate("/");
    //   window.location.reload();
    // }
    localStorage.removeItem("user");
    setUser(undefined);
  }
  const [mobileMenu, setMobileMenu] = useState(false);
  const { decodedToken, isExpired } = useJwt<Token>(
    localStorage.getItem("user") as string
  );
  const location = useLocation();
  const { user, setUser } = useAuth();
  useEffect(() => {
    if (isExpired) {
      localStorage.removeItem("user");
      setUser(null);
    } else {
      if (decodedToken) {
        setUser(decodedToken);
      }
    }
  }, [decodedToken, isExpired, setUser]);

  const navigation = [
    {
      name: "Калькулятор",
      to: "/calculator/new",
    },
    // user?.role.includes("ROLE_ADMIN") && {
    //   name: "Статистика",
    //   to: "/admin/statistics",
    // },
    user?.role.includes("ROLE_ADMIN") && {
      name: "Пользователи",
      to: "/admin/users",
    },
    user?.role.includes("ROLE_ADMIN") && {
      name: "Данные",
      to: "/admin/data",
    },
    {
      name: "Отрасли",
      to: "/industries",
    },
    // {
    //   name: "Услуги",
    //   to: "/services",
    // },
    // {
    //   name: "Карта",
    //   to: "/map",
    // },
    // {
    //   name: "Документы",
    //   to: "/documents",
    // },
    // {
    //   name: "Помощь",
    //   to: "/help",
    // },
  ].filter(Boolean);

  useEffect(() => {
    setMobileMenu(false);
  }, [location]);
  return (
    <>
      <div className="z-50 w-full  text-white min-h-[72px] bg-ldt-red max-md:fixed">
        <div className="max-w-[1400px] min-h-[72px] max-md:mt-2 items-center p-5 mx-auto gap-5 flex justify-between  py-3">
          <button
            className="hidden max-md:block"
            aria-label="Меню"
            type="button"
            onClick={() => setMobileMenu(!mobileMenu)}
          >
            <MenuIcon />
          </button>
          <Link
            to={"/"}
            className="flex items-center gap-6 text-lg font-medium max-md:text-center max-md:text-sm"
          >
            <div className="max-md:hidden">
              <LogoIcon />
            </div>
            Инвестиционный помощник города Москвы
          </Link>
          <Link
            to={
              user?.role.includes("ROLE_ADMIN")
                ? "/admin/users"
                : "/auth/signin"
            }
            className="flex items-center gap-2 font-medium max-md:text-sm"
          >
            <User />
            <div className="flex flex-col items-center max-md:hidden">
              <span>{!isExpired ? user?.sub : "Личный кабинет"}</span>
              <span>{user?.role.includes("ROLE_ADMIN") ? "(Админ)" : ""}</span>
            </div>
          </Link>
        </div>
      </div>
      <header
        className={`z-50 mx-auto w-full border-b border-ldt-gray max-md:fixed max-md:top-20 max-md:bg-white max-md:h-screen max-md:w-full ${
          mobileMenu ? "max-md:block" : "max-md:hidden"
        }`}
      >
        <nav className="max-w-[1400px] p-5 mx-auto py-4">
          <ul
            className={`flex max-md:flex-col gap-8 max-lg:gap-4 max-lg:justify-center`}
          >
            {navigation.map((item, i) => {
              if (!item) return;
              return (
                <li key={i} className="">
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      (isActive ? "text-ldt-red" : "") + " hover:text-ldt-red"
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              );
            })}
            {user && (
              <li className="ml-auto">
                <button className="hover:text-ldt-red" onClick={handleLogout}>
                  Выйти из аккаунта
                </button>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
