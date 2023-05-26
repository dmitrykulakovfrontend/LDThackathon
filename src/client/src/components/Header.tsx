import React from "react";
import { Link, NavLink } from "react-router-dom";
import LogoIcon from "@/assets/small-logo.svg";
import User from "@/assets/user.svg";
import { useCookies } from "react-cookie";
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

function Header() {
  const [cookies, setCookie, removeCookie] = useCookies();

  return (
    <>
      <div className="text-white bg-ldt-red">
        <div className="max-w-[1400px] p-5 mx-auto gap-5 flex justify-between py-2">
          <Link
            to={"/"}
            className="flex gap-6 text-lg font-medium max-md:text-sm"
          >
            <LogoIcon />
            Инвестиционный калькулятор города Москвы
          </Link>
          <Link
            to={"/auth/signin"}
            className="flex gap-2 font-medium max-md:text-sm max-sm:flex-col max-sm:items-center"
          >
            <User />
            <span className="overflow-hidden truncate text-ellipsis w-[10ch]">
              {cookies["remember-me"]
                ? cookies["remember-me"]
                : "Личный кабинет"}
            </span>
          </Link>
        </div>
      </div>
      <header className="mx-auto border-b border-ldt-gray">
        <nav className="max-w-[1400px] p-5 mx-auto py-4">
          <ul className="flex flex-wrap gap-8 max-lg:gap-4 max-lg:justify-center">
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
