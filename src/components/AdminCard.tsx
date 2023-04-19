import { cardContext } from "@/context/CardContext";
import { inventoryContext } from "@/context/InventoryContext";
import React, { useContext, useState, ChangeEvent, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { productContext } from "@/context/ProductContext";

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

interface Icounter {
  CANTIDAD_CONTADA: number | any;
}

export default function AdminCard({ info }: EntryCardProps) {
  // console.log(info);
  const { productChoose, setProductChoose } = useContext(productContext);

  const { fieldChoose, setFieldChoose } = useContext(cardContext);
  const { updateInventory } = useContext(inventoryContext);
  const [presentation, setPresentation] = useState(0);

  const [counter, setCounter] = useState<Icounter>({
    CANTIDAD_CONTADA: !info.CANTIDAD_CONTADA ? Number : info.CANTIDAD_CONTADA,
  });

  console.log("counter:", counter.CANTIDAD_CONTADA);

  const getProduct = async (producto: string) => {
    try {
      const response = await axios.get(
        `https://purchasing-control.vercel.app/api/products/${producto}`
      );
      setPresentation(response.data[0].PRESENTACION);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduct(info.PRODUCTO);
  }, []);

  const formik = useFormik({
    initialValues: {
      counter,
    },
    onSubmit: (values) => {
      updateInventory(info._id, values.counter);
      setCounter(values.counter);
      setProductChoose("n");
    },

    enableReinitialize: true,
  });

  console.log("formik.values:", formik.values);

  const TOTAL: number = presentation * counter.CANTIDAD_CONTADA;

  return (
    <tr className="bg-white text-xs   ">
      <th
        scope="row"
        className="px-2 py-2 text-black font-medium whitespace-nowrap "
      >
        {info.PRODUCTO}
      </th>
      <td className="px-2 py-2 ">{info.NOMBRE}</td>
      <td className="px-2 py-2 ">
        {presentation === null || presentation === undefined
          ? "----"
          : presentation}
      </td>
      <td className="px-2 py-2 ">{info.LOTE}</td>
      <td className="px-2 py-2 ">{info.CANTIDAD}</td>
      <td
        className="px-2 py-2 "
        // style={fieldChoose === info._id ? fieldCheck : {}}
        onClick={() => setFieldChoose(info._id)}
      >
        <>
          <form onSubmit={formik.handleSubmit}>
            <input
              name="counter.CANTIDAD_CONTADA"
              type="number"
              className="inputEdit"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.counter.CANTIDAD_CONTADA}
            />
            <button type="submit" className="hidden">
              Cambiar
            </button>
          </form>
        </>
      </td>
      <td
        style={isNaN(TOTAL) ? { visibility: "hidden" } : {}}
        className="px-2 py-2 "
      >
        {TOTAL}
      </td>
      <td
        style={isNaN(TOTAL) ? { visibility: "hidden" } : {}}
        className={`px-2 py-2 font-medium ${
          TOTAL - info.CANTIDAD > 0 ? "text-gray-700" : "text-red-500"
        }`}
      >
        {TOTAL - info.CANTIDAD}
      </td>
    </tr>
  );
}
