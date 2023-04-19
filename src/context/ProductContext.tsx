import { ReactNode, createContext, useState } from "react";
import axios from "axios";

interface ProductContextProps {
  children: ReactNode;
}

interface IProducts {
  PRODUCTO: string;
  NOMBRE: string;
  PRESENTACION: number;
  _id: string;
  createdAt: string;
  updateAt: string;
}

interface IContext {
  productChoose: string;
  setProductChoose: React.Dispatch<React.SetStateAction<string>>;
  products: IProducts[];
  setProducts: React.Dispatch<React.SetStateAction<IProducts[]>>;
  createProduct: (values: object | undefined) => Promise<void>;
  deleteProduct: (producto: string) => Promise<void>;
  updateProduct: (producto: string, body: object) => Promise<void>;
}

export const productContext = createContext<IContext>({
  productChoose: "n",
  setProductChoose: () => {},
  products: [],
  setProducts: () => {},
  createProduct: async () => {},
  deleteProduct: async () => {},
  updateProduct: async () => {},
});

export const ProductContextProvider = ({ children }: ProductContextProps) => {
  const [products, setProducts] = useState<IProducts[]>([]);

  const [productChoose, setProductChoose] = useState<string>("n");

  const createProduct = async (values: object | undefined) => {
    try {
      const response = await axios.post(
        "https://purchasing-control.vercel.app/api/products",
        values
      );
      setProducts([...products, response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProduct = async (producto: string) => {
    try {
      const response = await axios.delete(
        `https://purchasing-control.vercel.app/api/products/${producto}`
      );
      setProducts(products.filter((product) => product.PRODUCTO !== producto));
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateProduct = async (producto: string, body: object) => {
    try {
      const response = await axios.put(
        `https://purchasing-control.vercel.app/api/products/${producto}`,
        body
      );
      setProducts(
        products.map((product) => {
          if (product.PRODUCTO === producto) {
            return response.data;
          } else {
            return product;
          }
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <productContext.Provider
      value={{
        products,
        setProducts,
        createProduct,
        deleteProduct,
        productChoose,
        setProductChoose,
        updateProduct,
      }}
    >
      {children}
    </productContext.Provider>
  );
};
