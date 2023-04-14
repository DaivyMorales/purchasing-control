import React, { useContext, useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import InventoryCard from "@/components/InventoryCard";
import { cardContext } from "@/context/CardContext";

interface MyProps {
  data: {
    PRODUCTO: string;
    NOMBRE: string;
    LOTE: string;
    CANTIDAD: number;
    CANTIDAD_CONTADA: number;
    _id: string;
    createdAt: string;
    updatedAt: string;
  };
}

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

interface Info {
  PRODUCTO: string;
  NOMBRE: string;
  LOTE: string;
  CANTIDAD: number;
  CANTIDAD_CONTADA: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export default function index({ data }: MyProps) {
  const { fieldChoose, setFieldChoose } = useContext(cardContext);

  const [information, setInformation] = useState<IInventory[]>([]);

  useEffect(() => {
    setInformation(data);
    console.log(data);
  }, []);

  return (
    <div
      className="  mx-auto flex justify-center items-center"
      // onClick={() => setFieldChoose()}
    >
      <div className="relative overflow-x-auto my-20 sm:rounded-lg rounded-t-xl shadow-lg ">
        <table className="w-full text-xs text-left text-gray-500 rounded-t-xl ">
          <thead className="text-xs text-gray-800  py-4 font-normal  rounded-t-xl">
            <tr>
              <th scope="col" className="px-2 py-2 rounded-ss-lg">
                Producto
              </th>
              <th scope="col" className="px-2 py-2 ">
                Lote
              </th>
              <th scope="col" className="px-2 py-2 ">
                Cantidad
              </th>
              <th scope="col" className="px-2 py-2">
                Nombre
              </th>

              <th scope="col" className="px-2 py-2 ">
                Cantidad contada
              </th>
              <th scope="col" className="px-2 py-2 ">
                Total
              </th>
              <th scope="col" className="px-2 py-2 rounded-se-lg">
                Diferencia
              </th>
            </tr>
          </thead>
          <tbody>
            {information.map((info: Info) => (
              <InventoryCard key={info._id} info={info} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res = await fetch("http://localhost:3000/api/inventory");
  const data = await res.json();

  return {
    props: { data },
  };
}
