import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import LogoIcon from "@/assets/small-logo.svg";
import MenuIcon from "@/assets/icon-menu.svg";
import User from "@/assets/user.svg";
import { useCookies } from "react-cookie";
import { decodeToken, useJwt } from "react-jwt";
const navigation = [
  {
    name: "Калькулятор",
    to: "/calculator/new",
  },
  {
    name: "Объекты",
    to: "/objects",
  },
  {
    name: "Услуги",
    to: "/services",
  },
  {
    name: "Карта",
    to: "/map",
  },
  {
    name: "Документы",
    to: "/documents",
  },
  {
    name: "Помощь",
    to: "/help",
  },
];

type Token = {
  sub: string;
  role: string[];
  iat: number;
  exp: number;
};

function Header() {
  const [cookies, setCookie, removeCookie] = useCookies();
  const [user, setUser] = useState<Token | null>();
  const [mobileMenu, setMobileMenu] = useState(false);
  const { decodedToken, isExpired, reEvaluateToken } = useJwt<Token>(
    localStorage.getItem("user") as string
  );
  console.log({ decodedToken, isExpired, reEvaluateToken });
  useEffect(() => {
    if (isExpired) {
      localStorage.removeItem("user");
      setUser(null);
    } else {
      setUser(decodedToken);
    }
  }, [decodedToken, isExpired]);
  return (
    <>
      <div className="z-50 w-full text-white bg-ldt-red max-md:fixed">
        <div className="max-w-[1400px] p-5 mx-auto gap-5 flex justify-between  py-2">
          <button
            className="hidden max-md:block"
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
            Инвестиционный калькулятор города Москвы
          </Link>
          <Link
            to={"/auth/signin"}
            className="flex items-center gap-2 font-medium max-md:text-sm"
          >
            <User />
            <span className="max-md:hidden">
              {!isExpired ? user?.sub : "Личный кабинет"}
            </span>
          </Link>
        </div>
      </div>
      <header
        className={`z-50 mx-auto border-b border-ldt-gray max-md:fixed max-md:top-14 max-md:bg-white max-md:h-screen max-md:w-full ${
          mobileMenu ? "max-md:block" : "max-md:hidden"
        }`}
      >
        <nav className="max-w-[1400px] p-5 mx-auto py-4">
          <ul className="flex flex-wrap gap-8 max-lg:gap-4 max-lg:justify-center max-md:flex-col">
            {navigation.map(({ to, name }, i) => (
              <li key={i}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    (isActive ? "text-ldt-red" : "") + " hover:text-ldt-red"
                  }
                >
                  {name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
