import React, { useContext, useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import InventoryCard from "@/components/InventoryCard";
import { cardContext } from "@/context/CardContext";

interface MyProps {
  data: IInventory[];
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

export default function index({ data }: MyProps) {
  const { fieldChoose, setFieldChoose } = useContext(cardContext);

  const [information, setInformation] = useState<IInventory[]>([]);

  useEffect(() => {
    setInformation(data);
    console.log(data);
  }, []);

  return (
    <div
      className="  mx-auto flex justify-center items-center "
      // onClick={() => setFieldChoose()}
    >
      
      <div className="relative overflow-x-auto my-20 sm:rounded-lg  border-1 border-gray-100 ">
        <table className="w-full text-xs text-left text-gray-500 rounded-t-xl ">
          <thead className="text-xs text-gray-800  py-4 font-normal  rounded-t-xl">
            <tr className="border-b font-normal text-xs border-gray-100">
              <th scope="col" className="px-2 py-2 rounded-ss-lg">
                Producto
              </th>
              <th scope="col" className="px-2 py-2">
                Nombre
              </th>
              <th scope="col" className="px-2 py-2">
                Presentacion
              </th>
              <th scope="col" className="px-2 py-2 ">
                Lote
              </th>
              <th scope="col" className="px-2 py-2 ">
                Cantidad
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
            {information.map((info: IInventory) => (
              <InventoryCard info={info} key={info._id} />
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
