import * as xlsx from "xlsx";
import mongoose from "mongoose";
import { dbConnect } from "./database";
import Inventory from "../models/inventory";

interface ExcelData {
  inventory_balance: number;
  month_consumption: number;
}

async function importData() {
  await dbConnect();

  const workbook = xlsx.readFile(
    "C:\\Users\\daivy\\OneDrive\\Escritorio\\purchasing-control\\src\\utils\\file.xlsx"
  );

  const worksheet = workbook.Sheets["Sheet1"];
  const data = xlsx.utils.sheet_to_json<ExcelData>(worksheet);

  const insertedData = await Inventory.insertMany(data);

  return insertedData;
}

export default importData;
