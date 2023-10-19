import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Nprogressbar from "nextjs-progressbar";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Nprogressbar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
