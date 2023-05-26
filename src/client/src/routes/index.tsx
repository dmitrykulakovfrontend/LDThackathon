import { Link, useNavigate } from "react-router-dom";
import React from "@/assets/react.svg";
import Vite from "@/assets/vite.svg";
import { API_URL } from "@/constants";

function Index() {
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      const res = await fetch(`${API_URL}/auth/logout`);
      if (res.ok) {
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      window.location.reload();
    }
  }
  return (
    <div className="flex flex-col items-center justify-center gap-4 px-4 py-12 sm:px-6 lg:px-8">
      <React />
      <Link
        to={"auth/signin"}
        className="px-4 py-2 text-blue-600 border shadow-inner hover:text-blue-700 rounded-xl"
      >
        Авторизация
      </Link>
      <Link
        to={"auth/signup"}
        className="px-4 py-2 text-blue-600 border shadow-inner hover:text-blue-700 rounded-xl"
      >
        Регистрация
      </Link>
      <Link
        to={"calculator/new"}
        className="px-4 py-2 text-blue-600 border shadow-inner hover:text-blue-700 rounded-xl"
      >
        Калькулятор
      </Link>
      <button
        onClick={handleLogout}
        className="px-4 py-2 text-blue-600 border shadow-inner hover:text-blue-700 rounded-xl"
      >
        Логаут
      </button>
      <Vite />
    </div>
  );
}

export default Index;
