import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import type { AppProps } from "next/app";
import Nprogressbar from "nextjs-progressbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <Nprogressbar />
      <Component {...pageProps} />
    </ClerkProvider>
  );
}
