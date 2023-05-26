import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import LogoIcon from "@/assets/small-logo.svg";
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
      <div className="text-white bg-ldt-red">
        <div className="max-w-[1400px] p-5 mx-auto gap-5 flex justify-between py-2">
          <Link
            to={"/"}
            className="flex items-center gap-6 text-lg font-medium max-md:text-sm"
          >
            <LogoIcon />
            Инвестиционный калькулятор города Москвы
          </Link>
          <Link
            to={"/auth/signin"}
            className="flex items-center gap-2 font-medium max-md:text-sm"
          >
            <User />
            <span className="max-sm:truncate  max-sm:w-[10ch]">
              {!isExpired ? user?.sub : "Личный кабинет"}
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
