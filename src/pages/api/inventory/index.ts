import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../../../utils/database";
import importData from "../../../utils/importData";
import Inventory from "../../../models/inventory";

export default async function indexInventory(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const inventory = await Inventory.find();
        return res.status(200).json(inventory);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(500).json({ error: "Ha ocurrido un error." });
        }
      }
      break;

    case "POST":
      try {
        const insertedData = await importData();

        return res.status(200).json(insertedData);
      } catch (error) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(500).json({ error: "Ha ocurrido un error." });
        }
      }
      break;

    default:
      res.status(400).json("Invalid method!");
      break;
  }
}
