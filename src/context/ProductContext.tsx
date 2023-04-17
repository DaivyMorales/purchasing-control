import { ReactNode, createContext, useState } from "react";
import axios from "axios";

interface ProductContextProps {
  children: ReactNode;
}

interface IProducts {
  PRODUCTO: string;
  NOMBRE: string;
  PRESENTACION: number;
}

interface IContext {
  products: IProducts[];
  setProducts: React.Dispatch<React.SetStateAction<IProducts[]>>;
  createProduct: (values: object | undefined) => Promise<void>;
}

export const productContext = createContext<IContext>({
  products: [],
  setProducts: () => {},
  createProduct: async () => {},
});

export const ProductContextProvider = ({ children }: ProductContextProps) => {
  const [products, setProducts] = useState<IProducts[]>([]);

  const createProduct = async (values: object | undefined) => {
    console.log(values);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/products",
        values
      );
      setProducts([...products, response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <productContext.Provider value={{ products, setProducts, createProduct }}>
      {children}
    </productContext.Provider>
  );
};
