import { Link } from "react-router-dom";
import indexImgSrc from "@/assets/index.webp";
import { useAuth } from "@/contexts/useAuth";
import { useBackground } from "@/contexts/useBackground";
import { useEffect, useState } from "react";
import { API_URL } from "@/constants";
import { User } from "@/types/user";
import CalculatorIcon from "@/assets/calculator.svg";
import UserIcon from "@/assets/user.svg";

/**
 * Страница информации о пользователе
 */
function AccountPage() {
  const [token] = useState<string | null>(
    JSON.parse(localStorage.getItem("user") as string)
  );
  const [user, setUser] = useState<User>();
  const { setBackground } = useBackground();
  useEffect(() => {
    setBackground({ color: "#E6E6E6", icon: UserIcon });
    fetch(`${API_URL}/admin/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.log(err));
    return () => {
      setBackground({ color: undefined, icon: undefined });
    };
  }, []);
  console.log(user);
  return (
    <div className={`flex flex-col gap-8 z-10 relative `}>
      <h1 className="text-3xl font-bold max-md:my-0">Профиль</h1>
      <div className="flex gap-8 max-md:flex-col">
        <div className="w-full font-medium text-lg flex flex-col gap-4 max-w-md pb-14 pt-7 border-t-[32px] border-t-ldt-red bg-white px-14 rounded-3xl max-sm:pb-7 max-sm:pt-4 max-sm:px-7">
          <div className="flex items-start justify-between gap-2">
            <p className="text-xl font-bold">{user?.name}</p>
            <button className="text-blue-500 cursor-pointer">Изменить</button>
          </div>
          <div>
            <a
              href={`mailto: ${user?.email}`}
              className="text-blue-500 cursor-pointer"
            >
              {user?.email}
            </a>
          </div>
          <div>
            <p>Страна: {user?.country ? user.country : "Не указано"}</p>
            <p>Город: {user?.city ? user.city : "Не указано"}</p>
            <p>ИНН: {user?.inn ? user.inn : "Не указано"}</p>
          </div>
        </div>
        <div className="flex flex-col w-full gap-8">
          <div className="flex font-medium text-lg flex-col min-h-[188px] max-md:max-w-md flex-1 w-full max-w-sm gap-4 p-8 bg-white rounded-3xl">
            <div className="flex justify-between gap-2">
              <p className="text-xl font-bold">Вход в систему</p>
              <button className="text-blue-500 cursor-pointer">Изменить</button>
            </div>
            <div>
              <p>Пароль: *************</p>
            </div>
          </div>
          <div className="flex font-medium text-lg flex-col min-h-[188px] max-md:max-w-md flex-1 w-full max-w-sm gap-4 p-8 bg-white rounded-3xl">
            <div className="flex justify-between gap-2">
              <p className="text-xl font-bold">Мои расчеты</p>
            </div>
            <CalculatorIcon className="ml-auto" />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full max-w-md gap-4 text-lg font-medium bg-white max-sm:p-7 p-14 rounded-3xl">
        <div className="flex justify-between gap-2">
          <p className="text-xl font-bold">Организация</p>
          <button className="text-blue-500 cursor-pointer">Изменить</button>
        </div>
        <div>
          <p>
            Отрасль:{" "}
            {user?.business_type && user.business_type.length > 40
              ? user.business_type.slice(0, 40) + "..."
              : user?.business_type}
          </p>
          <p>
            Организация: {user?.organisation ? user.organisation : "Не указано"}
          </p>
          <p>Должность: {user?.job ? user.job : "Не указано"}</p>
          <p>
            Вебсайт:{" "}
            {user?.website ? (
              <a href={user.website}>{user.website}</a>
            ) : (
              "Не указано"
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AccountPage;
