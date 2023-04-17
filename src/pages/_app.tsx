import "@/styles/globals.css";
import "@/styles/main.scss";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { motion } from "framer-motion";

import { CardContextProvider } from "../context/CardContext";
import { InventoryContextProvider } from "../context/InventoryContext";
import { AlertContextProvider } from "../context/AlertContext";

const inter = Inter({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AlertContextProvider>
      <InventoryContextProvider>
        <CardContextProvider>
          {/* <main className={inter.className}> */}{" "}
          <Component {...pageProps} />
          {/* </main>k */}
        </CardContextProvider>
      </InventoryContextProvider>
    </AlertContextProvider>
  );
}
