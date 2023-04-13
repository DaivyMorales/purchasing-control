import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../../../utils/database";
import importData from "../../../utils/importData";
import Predict from "../../../models/predict";

export default async function indexPredict(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const entry = await Predict.find();
        return res.status(200).json(entry);
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
