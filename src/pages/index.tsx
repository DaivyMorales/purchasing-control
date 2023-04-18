import React, { useContext, useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import InventoryCard from "@/components/InventoryCard";
import { MdOutlineAdd } from "react-icons/md";
import { RiFileExcel2Fill } from "react-icons/ri";
import { cardContext } from "@/context/CardContext";
import * as xlsx from "xlsx";
import axios from "axios";
import { useRouter } from "next/router";
import { BiArrowToRight } from "react-icons/bi";



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

interface IData {
  CANTIDAD: number;
  LOTE: string;
  NOMBRE: string;
  PRODUCTO: string;
}

export default function index({ data }: MyProps) {
  const { fieldChoose, setFieldChoose } = useContext(cardContext);

  const [information, setInformation] = useState<IInventory[]>([]);
  const [dataFound, setDataFound] = useState<IData[]>([]);

  useEffect(() => {
    setInformation(data);
    console.log(data);
  }, []);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = async (event) => {
      if (!event.target) return;
      const fileBuffer = event.target.result as ArrayBuffer;
      const workbook = xlsx.read(fileBuffer, { type: "array" });
      const worksheet = workbook.Sheets["Sheet1"];
      const dataExcel: Array<IData> = xlsx.utils.sheet_to_json(worksheet);
      try {
        const response = await axios.post(
          "http://localhost:3000/api/inventory",
          dataExcel
        );
        console.log(response.data);
        setInformation(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fileReader.onerror = (event) => {
      console.error("Error reading file:", event);
    };
  };

  const router = useRouter();

  return (
    <div>
      <div>
        <div className="gradientDiv ">
          <div
            className="text-purple-700 flex justify-end px-4 py-3 items-center gap-x-1 cursor-pointer"
            onClick={() => router.push("/product")}
          >
            <BiArrowToRight  size={18} />
            <h4 className="text-purple-700 text-sm ">Ir a productos</h4>
          </div>
        </div>
        <div className=" flex flex-col justify-center items-center shadow-lg    ">
          <div className="container mt-42 -mt-52 mx-auto  px-10  flex flex-col gap-y-6 mb-10">
            <div className="flex flex-col gap-y-2">
              <h1>Tabla de inventario</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.{" "}
                <br></br> Tempore, eveniet?
              </p>
            </div>
            <div
              className={`relative overflow-x-auto  grid grid-cols-2 border-1 gap-4 rounded-xl  bg-white shadow-lg px-4 py-5`}
            >
              <div className="flex justify-start items-start ">
                <div className="text-2xs px-1 rounded-full bg-gray-200 font-black text-purple-700">
                  {information.length}
                </div>
              </div>
              <div className="flex justify-end items-start gap-x-3 ">
                <div>
                  <label className="buttonExcel">
                    <RiFileExcel2Fill />
                    Importar Excel
                    <input
                      className="hidden"
                      type="file"
                      accept=".xlsx"
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>
               
              </div>
              <table className="col-span-2 w-full text-sm text-left text-gray-500">
                <thead className="text-2xs text-gray-500">
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
                      Conteo
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
        </div>
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
