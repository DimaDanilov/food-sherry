import "@/styles/globals.css";
import { FONT_WEIGHT, montserrat } from "@/styles/globalStyles";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-weight: ${FONT_WEIGHT.default};
          font-family: ${montserrat.style.fontFamily};
        }
        h1 {
          font-weight: ${FONT_WEIGHT.h1};
          font-family: ${montserrat.style.fontFamily};
        }
        h2 {
          font-weight: ${FONT_WEIGHT.h2};
          font-family: ${montserrat.style.fontFamily};
        }
        h3 {
          font-weight: ${FONT_WEIGHT.h3};
          font-family: ${montserrat.style.fontFamily};
        }
        p {
          font-weight: ${FONT_WEIGHT.p};
          font-family: ${montserrat.style.fontFamily};
        }
        button {
          font-weight: ${FONT_WEIGHT.button};
          font-family: ${montserrat.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
