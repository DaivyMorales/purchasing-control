import { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../../../utils/database";
import Product from "../../../models/product";

export default async function indexPredict(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const product = await Product.find();
        return res.status(200).json(product);
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
        const { PRODUCTO, NOMBRE, PRESENTACION } = body;

        const newProduct = new Product({
          PRODUCTO,
          NOMBRE,
          PRESENTACION,
        });

        const productSaved = await newProduct.save();

        return res.status(200).json(productSaved);
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
