import { Schema, model, models } from "mongoose";

type SchemaPredict = {
  CODIGO: string;
  DESCRIPCION: string;
  MINIMOS: number;
  MAXIMOS: number;
  CONSUMO_MES: number;
};

const predictSchema = new Schema<SchemaPredict>(
  {
    CODIGO: {
      type: String,
      required: true,
      trim: true,
    },
    DESCRIPCION: {
      type: String,
      required: true,
      trim: true,
    },
    MINIMOS: {
      type: Number,
      required: true,
    },
    MAXIMOS: {
      type: Number,
      required: true,
    },
    CONSUMO_MES: {
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
