import { useContext, createContext, ReactNode, useState } from "react";

interface FileContextProviderProps {
  children: ReactNode;
}

interface IData {
  CANTIDAD: number;
  LOTE: string;
  NOMBRE: string;
  PRODUCTO: string;
}

interface IContext {
  data: IData[];
  setData: React.Dispatch<React.SetStateAction<IData[]>>;
}

export const fileContext = createContext<IContext>({
  data: [],
  setData: () => {},
});

export const FileContextProvider = ({ children }: FileContextProviderProps) => {
  const [data, setData] = useState<IData[]>([]);
  return (
    <fileContext.Provider value={{ data, setData }}>
      {children}
    </fileContext.Provider>
  );
};
