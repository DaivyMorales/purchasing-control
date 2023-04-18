// import * as xlsx from "xlsx";
// import mongoose from "mongoose";
// import { dbConnect } from "./database";
// import Inventory from "../models/inventory";
// // import memFs from "../components/excel/memory-fs";

// interface ExcelData {
//   inventory_balance: number;
//   month_consumption: number;
// }

// async function importData() {
//   await dbConnect();

//   // const fileData = JSON.parse(memFs.readFileSync("/data.json"));

//   const workbook = xlsx.readFile(fileData);

//   const worksheet = workbook.Sheets["Sheet1"];
//   const data = xlsx.utils.sheet_to_json<ExcelData>(worksheet);

//   const insertedData = await Inventory.insertMany(data);

//   return insertedData;
// }

// export default importData;
