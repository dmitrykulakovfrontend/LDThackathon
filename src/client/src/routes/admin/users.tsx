import { useAuth } from "@/contexts/useAuth";
import React from "react";
import { redirect, useNavigate } from "react-router-dom";
import useEffect from "react";
const users = [
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
  "Отрасль",
  "Кол-во посещений",
  "Последнее посещение",
];
function Users() {
  const { user } = useAuth();
  console.log(user);
  console.log();
  if (!user?.role.includes("ROLE_ADMIN")) {
    redirect("/auth/signin");
  }
  return (
    <>
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
        <tbody className=" border-ldt-gray">
          {users.map((user, i) => (
            <tr key={i} className=" border-ldt-gray">
              {Object.values(user).map((value, i) => (
                <td key={i} className="p-3 border-ldt-gray">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot></tfoot>
      </table>
    </>
  );
}

export default Users;
