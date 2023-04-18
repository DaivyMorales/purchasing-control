import { createContext, useState, ReactNode } from "react";
import axios from "axios";

interface EntryContextProviderProps {
  children: ReactNode;
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

interface IContext {
  inventories: IInventory[];
  setInventories: React.Dispatch<React.SetStateAction<IInventory[]>>;
  updateInventory: (id: string, body: object) => Promise<void>;
  getInventory: (id: string) => Promise<void>;
}

export const inventoryContext = createContext<IContext>({
  inventories: [],
  setInventories: () => {},
  updateInventory: async () => {},
  getInventory: async () => {},
});

export const InventoryContextProvider = ({
  children,
}: EntryContextProviderProps) => {
  const [inventories, setInventories] = useState<IInventory[]>([]);

  const updateInventory = async (id: string, body: object) => {
    console.log(id, body);
    try {
      const response = await axios.put(
        `http://localhost:3000/api/inventory/${id}`,
        body
      );

      //   console.log(response)

      setInventories(
        inventories.map((inventory) => {
          if (inventory._id === id) {
            return response.data;
          } else {
            return inventory;
          }
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getInventory = async (id: string) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/inventory/${id}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <inventoryContext.Provider
      value={{ inventories, setInventories, updateInventory, getInventory }}
    >
      {children}
    </inventoryContext.Provider>
  );
};
