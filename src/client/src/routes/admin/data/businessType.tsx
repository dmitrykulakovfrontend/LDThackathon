import React, { useEffect, useState } from "react";
import EditIcon from "@/assets/edit.svg";
import DeleteIcon from "@/assets/trashcan.svg";
import { API_URL } from "@/constants";
import { Link } from "react-router-dom";

const headers = [
  "№",
  "Наименование",
  "Минимальная зарплата",
  "Цена",
  "Действия",
];

/**
 * Страница отображения всех отраслей для администратора
 * @returns {any}
 */
function BusinessType() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [token] = useState<string>(
    JSON.parse(localStorage.getItem("user") as string)
  );
  async function fetchData() {
    const response = await fetch(`${API_URL}/admin/businesses`);
    const data = await response.json();
    setBusinesses(data);
  }
  useEffect(() => {
    fetchData();
  }, []);
  console.log(businesses);
  return (
    <div className="mt-5 overflow-x-auto">
      <div className="flex items-center justify-between gap-4 max-md:flex-col max-md:mb-4">
        <Link
          to="../"
          className={`px-12 py-2 bg-white border-2 rounded-xl transition-all text-ldt-red border-ldt-red hover:border-red-700 hover:text-red-700 hover:scale-105 ml-1 active:scale-95 `}
        >
          Назад
        </Link>
        <h1 className="my-8 text-3xl font-bold text-center max-md:my-0">
          Обезличенные данные по отраслям
        </h1>
        <button
          onClick={() => setIsCreating(true)}
          className="px-12 py-2 mr-1 text-blue-500 transition-all border-2 border-blue-500 h-fit rounded-xl hover:scale-105 active:scale-95"
        >
          Добавить
        </button>
      </div>
      <table className="w-full border-collapse border-ldt-gray">
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
          {isCreating ? (
            <BusinessDisplay
              business={{
                id:
                  (businesses && businesses[businesses.length - 1].id + 1) || 0,
                type: "",
                minimalSalary: 0,
                cost: 0,
              }}
              token={token}
              fetchData={fetchData}
              isCreating
              setIsCreating={setIsCreating}
            />
          ) : (
            ""
          )}
          {businesses?.map((business) => (
            <BusinessDisplay
              key={business.id}
              business={business}
              fetchData={fetchData}
              token={token}
            />
          ))}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
}
export type Business = {
  id: number;
  type: string;
  minimalSalary: number;
  cost: number;
  [key: string]: string | number;
};
function BusinessDisplay({
  business,
  isCreating,
  setIsCreating,
  fetchData,
  token,
}: {
  business: Business;
  isCreating?: boolean;
  setIsCreating?: (value: boolean) => void;
  fetchData: () => Promise<void>;
  token: string;
}) {
  async function handleDelete() {
    console.log("delete", business);
    await fetch(`${API_URL}/admin/business/${business.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    await fetchData();
  }

  function handleEdit() {
    setIsEditMode(true);
    console.log("editing...");
  }
  function handleChange(key: string, value: string) {
    setNewBusiness({
      ...newBusiness,
      [key]: value,
    });
  }
  function cancelCreating() {
    if (setIsCreating) setIsCreating(false);
  }
  function cancelEditing() {
    setIsEditMode(false);
  }
  async function handleSave() {
    setIsEditMode(false);
    console.log("save");
    const res = await fetch(`${API_URL}/admin/business/${business.id}`, {
      method: "PUT",
      body: JSON.stringify({
        type: newBusiness.type,
        cost: newBusiness.cost,
        minimalSalary: newBusiness.minimalSalary,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    await fetchData();
  }
  async function handleCreate() {
    try {
      const res = await fetch(`${API_URL}/admin/business`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cost: newBusiness.cost,
          type: newBusiness.type,
          minimalSalary: newBusiness.minimalSalary,
        }),
      });
      console.log(res);
      await fetchData();
    } catch (e) {
      console.error(e);
    } finally {
      if (setIsCreating) setIsCreating(false);
    }
  }
  const [isEditMode, setIsEditMode] = useState(false);
  const [newBusiness, setNewBusiness] = useState(business);
  return (
    <>
      <tr className="border-2 border-ldt-gray">
        {Object.entries(business).map(([key, value], i) => (
          <td key={i} className="p-3 border-2 border-ldt-gray">
            {key === "id" && (isCreating || isEditMode) ? (
              value
            ) : isEditMode || isCreating ? (
              <input
                value={String(newBusiness[key])}
                onChange={(e) => handleChange(key, e.target.value)}
                type="text"
                className="table-cell w-full border border-black"
              ></input>
            ) : (
              value
            )}
          </td>
        ))}
        <td className="flex items-center gap-2 p-3">
          {isEditMode || isCreating ? (
            <div className="flex items-center gap-2">
              <span
                className="text-blue-500 hover:cursor-pointer"
                onClick={isCreating ? handleCreate : handleSave}
              >
                {isCreating ? "Создать" : "Обновить"}
              </span>
              <span
                className="hover:cursor-pointer text-ldt-red"
                onClick={isCreating ? cancelCreating : cancelEditing}
              >
                Отменить
              </span>
            </div>
          ) : (
            <>
              <div
                className="hover:cursor-pointer hover:text-yellow-500"
                onClick={handleEdit}
              >
                <EditIcon />
              </div>
              <div
                className="hover:cursor-pointer hover:text-ldt-red"
                onClick={handleDelete}
              >
                <DeleteIcon />
              </div>
            </>
          )}
        </td>
      </tr>
    </>
  );
}

export default BusinessType;
