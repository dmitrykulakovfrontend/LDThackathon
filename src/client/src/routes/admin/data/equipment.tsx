import React, { useEffect, useState } from "react";
import EditIcon from "@/assets/edit.svg";
import DeleteIcon from "@/assets/trashcan.svg";
import { API_URL } from "@/constants";

const headers = ["№", "Наименование", "Цена", "Действия"];

/**
 * Страница отображения всего оборудования для администратора
 * @returns {any}
 */
function Equipment() {
  const [equipments, setEquipments] = useState<Equipment[]>();
  const [isCreating, setIsCreating] = useState(false);

  async function fetchData() {
    const response = await fetch(`${API_URL}/admin/equipments`);
    const data = await response.json();
    setEquipments(data);
  }
  useEffect(() => {
    fetchData();
  }, []);
  console.log(equipments);
  return (
    <div className="mt-5 overflow-x-auto">
      <div className="flex items-center justify-between">
        <h1 className="my-8 text-3xl font-bold">Средняя цена оборудования</h1>
        <button
          onClick={() => setIsCreating(true)}
          className="px-12 py-2 text-blue-500 border-2 border-blue-500 h-fit rounded-xl"
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
            <EquipmentDisplay
              fetchData={fetchData}
              equipment={{
                id: -1,
                type: "",
                cost: -1,
              }}
              isCreating
              setIsCreating={setIsCreating}
            />
          ) : (
            ""
          )}
          {equipments?.map((equipment, i) => (
            <EquipmentDisplay
              key={i}
              equipment={equipment}
              fetchData={fetchData}
            />
          ))}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
}
export type Equipment = {
  id: number;
  type: string;
  cost: number | null;
  [key: string]: string | number | null;
};
function EquipmentDisplay({
  equipment,
  isCreating,
  setIsCreating,
  fetchData,
}: {
  equipment: Equipment;
  isCreating?: boolean;
  setIsCreating?: (value: boolean) => void;
  fetchData: () => Promise<void>;
}) {
  async function handleDelete() {
    console.log("delete", equipment);
    await fetch(`${API_URL}/admin/deleteEquipment`, {
      method: "DELETE",
      body: equipment.type,
    });
    await fetchData();
  }

  function handleEdit() {
    setIsEditMode(true);
    console.log("editing...");
  }
  function handleChange(key: string, value: string) {
    setNewEquipment({
      ...newEquipment,
      [key]: value,
    });
  }
  function handleSave() {
    setIsEditMode(false);
    console.log("save");
    fetch(`${API_URL}/admin/updateEquipment`, {
      method: "PUT",
      body: JSON.stringify({ type: equipment.type, cost: newEquipment.cost }),
    }).then((res) => console.log(res));
  }
  async function handleCreate() {
    try {
      const res = await fetch(`${API_URL}/admin/equipment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cost: newEquipment.cost,
          type: newEquipment.type,
        }),
      });
      console.log("created");
      await fetchData();
    } catch (e) {
      console.error(e);
    } finally {
      if (setIsCreating) setIsCreating(false);
    }
  }
  const [isEditMode, setIsEditMode] = useState(false);
  const [newEquipment, setNewEquipment] = useState(equipment);
  return (
    <>
      <tr className="border-2 border-ldt-gray">
        {Object.entries(equipment).map(([key, value], i) => (
          <td key={i} className="p-3 border-2 border-ldt-gray">
            {isEditMode || isCreating ? (
              <input
                value={newEquipment[key] as string}
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
          <div className="hover:cursor-pointer" onClick={handleDelete}>
            <DeleteIcon />
          </div>
          {isCreating ? (
            <span className="hover:cursor-pointer" onClick={handleCreate}>
              Добавить
            </span>
          ) : (
            ""
          )}
          {/* {isEditMode ? (
            <span className="hover:cursor-pointer" onClick={handleSave}>
              Сохранить
            </span>
          ) : isCreating ? (
            <span className="hover:cursor-pointer" onClick={handleCreate}>
              Добавить
            </span>
          ) : (
            <div className="hover:cursor-pointer" onClick={handleEdit}>
              <EditIcon />
            </div>
          )} */}
        </td>
      </tr>
    </>
  );
}

export default Equipment;
