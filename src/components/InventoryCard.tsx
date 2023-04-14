import { cardContext } from "@/context/CardContext";
import React, { useContext, useState } from "react";

interface IInventory {
  PRODUCTO: string;
  NOMBRE: string;
  LOTE: string;
  CANTIDAD: number;
  CANTIDAD_CONTADA: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface EntryCardProps {
  info: IInventory;
}

export default function InventoryCard({ info }: EntryCardProps) {
  const { fieldChoose, setFieldChoose } = useContext(cardContext);

  const [fieldSelected, setFieldSelected] = useState<boolean>(false);

  const fieldCheck = {
    borderColor: "blue",
    borderWidth: "2px",
  };

  return (
    <tr className="bg-white  border-1 border-gray-100 " key={info._id}>
      <th
        scope="row"
        className="px-2 py-1 text-black font-medium whitespace-nowrap "
      >
        {info.PRODUCTO}
      </th>
      <td className="px-2 py-1 border-1 border-gray-100">{info.LOTE}</td>
      <td className="px-2 py-1 border-1 border-gray-100">{info.CANTIDAD}</td>
      <td className="px-2 py-1 border-1 border-gray-100">{info.NOMBRE}</td>
      <td
        className="px-2 py-1 border-1 border-gray-100"
        style={fieldChoose === info._id ? fieldCheck : {}}
        onClick={() => setFieldChoose(info._id)}
      >
        {fieldChoose === info._id ? (
          <input type="number" className="fieldInput" />
        ) : (
          info.CANTIDAD_CONTADA
        )}
      </td>
      <td className="px-2 py-1 border-1 border-gray-100">----</td>
      <td className="px-2 py-1 border-1 border-gray-100 text-red-400">--</td>
    </tr>
  );
}
