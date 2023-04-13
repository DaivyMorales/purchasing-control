import { Schema, model, models } from "mongoose";

type SchemaPredict = {
  inventory_balance: number;
  month_consumption: number;
};

const predictSchema = new Schema<SchemaPredict>(
  {
    inventory_balance: {
      type: Number,
      required: true,
    },
    month_consumption: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default models.Predict || model<SchemaPredict>("Predict", predictSchema);
