import "@/styles/globals.css";
import "@/styles/main.scss";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { motion } from "framer-motion";

import { CardContextProvider } from "../context/CardContext";
import { InventoryContextProvider } from "../context/InventoryContext";
import { AlertContextProvider } from "../context/AlertContext";
import { ProductContextProvider } from "../context/ProductContext";
import { FileContextProvider } from "@/context/FileCotext";

const inter = Inter({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FileContextProvider>
      <ProductContextProvider>
        <AlertContextProvider>
          <InventoryContextProvider>
            <CardContextProvider>
              {/* <main className={inter.className}> */}{" "}
              <Component {...pageProps} />
              {/* </main>k */}
            </CardContextProvider>
          </InventoryContextProvider>
        </AlertContextProvider>
      </ProductContextProvider>
    </FileContextProvider>
  );
}
