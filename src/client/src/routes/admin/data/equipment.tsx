import React from "react";

const headers = ["№", "Наименование", "Код", "Цена", "Действия"];
const equipments = [
  {
    id: 1,
    name: "Стандарт",
    code: "S001",
    price: "1000",
  },
  {
    id: 2,
    name: "Стандарт 2",
    code: "S002",
    price: "2000",
  },
];

function Equipment() {
  // function name(params: type) {}
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
function EquipmentDisplay({ equipment }: { equipment: Equipment }) {
  return (
    <>
      <tr className="border-2 border-ldt-gray">
        {Object.values(equipment).map((value, i) => (
          <td key={i} className="p-3 border-2 border-ldt-gray">
            {value}
          </td>
        ))}
      </tr>
    </>
  );
}

export default Equipment;
