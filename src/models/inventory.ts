import { Schema, model, models } from "mongoose";

type SchemaInventory = {
  PRODUCTO: string;
  NOMBRE: string;
  LOTE: string;
  CANTIDAD: number;
  CANTIDAD_CONTADA: number;
};

const inventorySchema = new Schema<SchemaInventory>(
  {
    PRODUCTO: {
      type: String,
      trim: true,
    },
    NOMBRE: {
      type: String,
      trim: true,
    },
    LOTE: {
      type: String,
      trim: true,
    },
    CANTIDAD: {
      type: Number,
    },
    CANTIDAD_CONTADA: {
      type: Number,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Inventory ||
  model<SchemaInventory>("Inventory", inventorySchema);
