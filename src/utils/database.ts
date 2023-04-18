import { connect, connection } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

type Conn = {
  isConnected: boolean;
};

const conn: Conn = {
  isConnected: false,
};

export const dbConnect = async () => {
  if (conn.isConnected) return;

  const db = await connect(
    process.env.DB_URL_DEPLOYED || process.env.DB_LOCAL || ""
  );

  conn.isConnected = !!db.connections[0].readyState;

  console.log(db.connection.db.databaseName);
};

connection.on("connected", () => {
  console.log("DB CONNECTED!");
});

connection.on("ERROR", (err) => {
  console.log(err);
});
