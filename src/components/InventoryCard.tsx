import { cardContext } from "@/context/CardContext";
import { inventoryContext } from "@/context/InventoryContext";
import React, {
  useContext,
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
} from "react";
import axios from "axios";

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
  const { updateInventory } = useContext(inventoryContext);

  const [counter, setCounter] = useState<object>({
    CANTIDAD_CONTADA: 0,
  });

  const [presentation, setPresentation] = useState(0);
  console.log(presentation);

  const getProduct = async (producto: string) => {
    const response = await axios.get(
      `http://localhost:3000/api/products/${producto}`
    );
    // setpresentation({
    //   PRESENTACION: response.data.PRESENTACION
    // });
    setPresentation(response.data[0].PRESENTACION);
  };

  useEffect(() => {
    getProduct(info.PRODUCTO);
  }, []);

  const TOTAL = info.CANTIDAD * info.CANTIDAD_CONTADA;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await updateInventory(info._id, counter); // Evita que se recargue la página al enviar el formulario
    console.log(response);
  };

  const handleCounterChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCounter({
      CANTIDAD_CONTADA: event.target.value,
    });
  };

  const fieldCheck = {
    borderColor: "blue",
    borderWidth: "2px",
  };

  return (
    <tr className="bg-white border-b border-gray-100   ">
      <th
        scope="row"
        className="px-2 py-2 text-black font-medium whitespace-nowrap "
      >
        {info.PRODUCTO}
      </th>
      <td className="px-2 py-2 ">{info.NOMBRE}</td>
      <td className="px-2 py-2 ">{presentation}</td>
      <td className="px-2 py-2 ">{info.LOTE}</td>
      <td className="px-2 py-2 ">{info.CANTIDAD}</td>
      <td
        className="px-2 py-2 "
        style={fieldChoose === info._id ? fieldCheck : {}}
        onClick={() => setFieldChoose(info._id)}
      >
        {fieldChoose === info._id ? (
          <>
            <form onSubmit={handleSubmit}>
              <input
                type="number"
                className="fieldInput"
                onChange={handleCounterChange}
              />
              <button type="submit" className="hidden">
                Holas
              </button>
            </form>
          </>
        ) : (
          info.CANTIDAD_CONTADA
        )}
      </td>
      <td className="px-2 py-2 ">{TOTAL}</td>
      <td className="px-2 py-2  text-red-400">{TOTAL - info.CANTIDAD}</td>
    </tr>
  );
}
