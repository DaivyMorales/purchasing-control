import React, { useEffect, useState } from "react";
import { GetServerSidePropsContext } from "next";
import { MdOutlineAdd } from "react-icons/md";

interface MyProps {
  data: IProduct[];
}

interface IProduct {
  PRODUCTO: string;
  NOMBRE: string;
  PRESENTACION: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export default function HomeProduct({ data }: MyProps) {
  const [products, setProducts] = useState<IProduct[]>([]);
  console.log(products);

  useEffect(() => {
    setProducts(data);
  }, []);

  return (
    <div className=" flex justify-center items-center ">
      <div className="relative overflow-x-auto  grid grid-cols-2 border-1 gap-4 rounded-xl my-12 bg-white shadow-sm px-4 py-5">
        <div className="flex justify-start items-start ">
          <h4>Tabla de productos</h4>
          <div className="text-2xs px-1 rounded-full bg-gray-200 font-black text-purple-700">
            {products.length}
          </div>
        </div>
        <div className="flex justify-end items-start ">
          <button>
            <MdOutlineAdd size={15} />
            Crear nuevo
          </button>
        </div>
        <table className="col-span-2 w-full text-sm text-left text-gray-500 ">
          <thead className="text-2xs text-gray-500 ">
            <tr>
              <th scope="col" className="py-2">
                Numero
              </th>
              <th scope="col" className="py-2">
                Producto
              </th>
              <th scope="col" className="py-2">
                Nombre
              </th>
              <th scope="col" className="py-2">
                Presentacion
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr className="bg-white text-xs " key={product._id}>
                <td className="py-2 px-2 flex justify-center">
                  <div className="text-2xs py-1 px-2 bg-purple-100 rounded-full font-bold text-purple-700">{index}</div>
                </td>
                <th
                  scope="row"
                  className="py-2 px-2 font-bold text-gray-900 whitespace-nowrap "
                >
                  {product.PRODUCTO}
                </th>
                <td className="py-2 px-2">{product.NOMBRE}</td>
                <td className="py-2 px-2">{product.PRESENTACION}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const res = await fetch("http://localhost:3000/api/products");
  const data = await res.json();

  return {
    props: { data },
  };
}
