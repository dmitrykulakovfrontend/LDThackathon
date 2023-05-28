import { useAuth } from "@/contexts/useAuth";
import React, { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import useEffect from "react";
import { API_URL } from "@/constants";
import { Token, User } from "@/types/auth";
import { useJwt } from "react-jwt";
type shortUser = Pick<
  User,
  | "id"
  | "name"
  | "email"
  | "inn"
  | "city"
  | "organisation"
  | "business_type"
  | "job"
>;
const headers = [
  "№",
  "ФИО",
  "Почта",
  "ИНН",
  "Город",
  "Организация",
  "Отрасль",
  "Должность",
];
function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const { decodedToken } = useJwt<Token>(
    localStorage.getItem("user") as string
  );
  React.useEffect(() => {
    fetch(`${API_URL}/admin/users`, {
      headers: {
        Authorization: `Bearer ${decodedToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [decodedToken]);
  console.log(users);
  return (
    <div className="mt-5 overflow-x-auto">
      <table className="border-collapse border-ldt-gray">
        <thead className="border-2 border-ldt-gray">
          <tr>
            {headers.map((header, i) => (
              <th
                key={i}
                className="p-3 font-semibold text-left border-2 border-ldt-gray"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="border-2 border-ldt-gray">
          {users
            .map(
              ({
                id,
                name,
                email,
                inn,
                city,
                organisation,
                business_type,
                job,
              }) => ({
                id,
                name,
                email,
                inn,
                city,
                organisation,
                business_type,
                job,
              })
            )
            .map((user, i) => (
              <UserDisplay
                key={i}
                user={user}
                detailedUser={users.find((u) => u.id === user.id) as User}
              />
            ))}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
}

function UserDisplay({
  user,
  detailedUser,
}: {
  user: shortUser;
  detailedUser: User;
}) {
  const [hover, setHover] = useState(false);
  const mouse = useMousePosition();
  return (
    <>
      <tr
        className="border-2 border-ldt-gray"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {Object.values(user).map((value, i) => (
          <td key={i} className="p-3 border-2 border-ldt-gray">
            {value}
            {hover && mouse.x && mouse.y ? (
              <div
                className="absolute p-6 bg-white border-2 border-ldt-gray rounded-xl"
                style={{ left: mouse.x, top: mouse.y }}
              >
                <div className="flex items-center justify-between">
                  <span>{detailedUser.name}</span>
                  <span>{detailedUser.email}</span>
                </div>
                <div className="flex flex-col gap-2 mt-4">
                  <span>Страна: {detailedUser.country}</span>
                  <span>Город: {detailedUser.city}</span>
                  <span>ИНН: {detailedUser.inn}</span>
                </div>
                <div className="flex flex-col gap-2 mt-4">
                  <span>Организация: {detailedUser.organisation}</span>
                  <span>Должность: {detailedUser.job}</span>
                  <span>Веб-сайт: {detailedUser.website}</span>
                </div>
              </div>
            ) : (
              ""
            )}
          </td>
        ))}
      </tr>
    </>
  );
}
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = React.useState<{
    x: null | number;
    y: null | number;
  }>({
    x: null,
    y: null,
  });
  React.useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);
  return mousePosition;
};
export default Users;
