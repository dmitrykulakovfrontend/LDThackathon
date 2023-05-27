import { useAuth } from "@/contexts/useAuth";
import React, { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import useEffect from "react";
import { API_URL } from "@/constants";
import { Token, User } from "@/types/auth";
import { useJwt } from "react-jwt";
const usersData = [
  {
    id: 1,
    fullname: "Крапивина Антонина Геннадьевна",
    industry: "Пищевая промышленность",
    visited: 4,
    lastTimeSeen: "20.05.2023",
  },
  {
    id: 2,
    fullname: "Кулаков Дмитрий Андреевич",
    industry: "Веб-разработка",
    visited: 253,
    lastTimeSeen: "27.05.2023",
  },
];
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
              <tr key={i} className="border-2 border-ldt-gray">
                {Object.values(user).map((value, i) => (
                  <td key={i} className="p-3 border-2 border-ldt-gray">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
}

export default Users;
