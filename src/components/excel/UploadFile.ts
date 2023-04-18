import * as xlsx from "xlsx";
import { useContext } from "react";
import { fileContext } from "@/context/FileCotext";
import { dbConnect } from "@/utils/database";
import inventory from "@/models/inventory";

interface IData {
  CANTIDAD: number;
  LOTE: string;
  NOMBRE: string;
  PRODUCTO: string;
}

export const handleFileUpload = async (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  dbConnect();
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

    // Inserta los datos en la base de datos
    try {
      const insertedData = await inventory.insertMany(dataExcel);
      return insertedData;
    } catch (error) {
      console.error(error);
    }
  };

  fileReader.onerror = (event) => {
    console.error("Error reading file:", event);
  };
};
