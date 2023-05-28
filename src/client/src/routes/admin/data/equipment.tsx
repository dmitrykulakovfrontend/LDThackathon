import React, { useState } from "react";
import EditIcon from "@/assets/edit.svg";
import DeleteIcon from "@/assets/trashcan.svg";
import { API_URL } from "@/constants";

const headers = ["№", "Наименование", "Код", "Цена", "Действия"];
const equipments: {
  [key: string]: string;
}[] = [
  {
    id: "1",
    name: "Стандарт",
    code: "S001",
    price: "1000",
  },
  {
    id: "2",
    name: "Стандарт 2",
    code: "S002",
    price: "2000",
  },
];

function Equipment() {
  // function name(params: type) {}
  const [isCreating, setIsCreating] = useState(false);
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
              equipment={{
                id: "",
                name: "",
                code: "",
                price: "",
              }}
              isCreating
              setIsCreating={setIsCreating}
            />
          ) : (
            ""
          )}
          {equipments.map((equipment, i) => (
            <EquipmentDisplay key={i} equipment={equipment} />
          ))}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
}
type Equipment = typeof equipments extends readonly (infer T)[] ? T : never;
function EquipmentDisplay({
  equipment,
  isCreating,
  setIsCreating,
}: {
  equipment: Equipment;
  isCreating?: boolean;
  setIsCreating: (value: boolean) => void;
}) {
  function handleDelete() {
    console.log("delete", equipment);
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
  }
  async function handleCreate() {
    try {
      const res = await fetch(`${API_URL}/admin/equipment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cost: newEquipment.price,
          type: newEquipment.name,
        }),
      });
      const data = await res.text();
      console.log(data);
      console.log("created");
    } catch (e) {
      console.error(e);
    } finally {
      setIsCreating(false);
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
                value={newEquipment[key]}
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
          {isEditMode ? (
            <span onClick={handleSave}>Сохранить</span>
          ) : isCreating ? (
            <span onClick={handleCreate}>Добавить</span>
          ) : (
            <div className="hover:cursor-pointer" onClick={handleEdit}>
              <EditIcon />
            </div>
          )}
        </td>
      </tr>
    </>
  );
}

export default Equipment;
