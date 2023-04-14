import "@/styles/globals.css";
import "@/styles/main.scss";
import type { AppProps } from "next/app";
import { Archivo } from "next/font/google";

import { CardContextProvider } from "../context/CardContext";

const archivo = Archivo({
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CardContextProvider>
      <main className={archivo.className}>
        {" "}
        <Component {...pageProps} />
      </main>
    </CardContextProvider>
  );
}
