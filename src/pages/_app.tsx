import "@/styles/globals.css";
import {
  COLORS,
  FONT_SIZE,
  FONT_WEIGHT,
  montserrat,
} from "@/styles/globalStyles";
import type { AppProps } from "next/app";
import { auth } from "@/api/AuthRest";
import { useEffect } from "react";
import { User, useAuthStore } from "@/store/AuthStore";

export default function App({ Component, pageProps }: AppProps) {
  const authStore = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const user: User = await auth(token);
        if (user.email) {
          authStore.setUser(user);
        }
      }
      authStore.setFirstLoadStatus(true);
    };
    checkAuth();
  }, []);

  return (
    <>
      <style jsx global>{`
        html {
          font-weight: ${FONT_WEIGHT.default};
          font-family: ${montserrat.style.fontFamily};
        }
        h1 {
          font-size: ${FONT_SIZE.h1};
          font-weight: ${FONT_WEIGHT.h1};
          font-family: ${montserrat.style.fontFamily};
        }
        h2 {
          font-size: ${FONT_SIZE.h2};
          font-weight: ${FONT_WEIGHT.h2};
          font-family: ${montserrat.style.fontFamily};
        }
        h3 {
          font-size: ${FONT_SIZE.h3};
          font-weight: ${FONT_WEIGHT.h3};
          font-family: ${montserrat.style.fontFamily};
        }
        p {
          font-size: ${FONT_SIZE.p};
          font-weight: ${FONT_WEIGHT.p};
          font-family: ${montserrat.style.fontFamily};
        }
        a {
          font-size: ${FONT_SIZE.link};
          font-weight: ${FONT_WEIGHT.link};
          font-family: ${montserrat.style.fontFamily};
          color: ${COLORS.mainColor};
          text-decoration: none;
        }
        textarea,
        input {
          font-size: ${FONT_SIZE.input};
          font-weight: ${FONT_WEIGHT.input};
          font-family: ${montserrat.style.fontFamily};
        }
        select {
          font-size: ${FONT_SIZE.select};
          font-weight: ${FONT_WEIGHT.select};
          font-family: ${montserrat.style.fontFamily};
        }
        button {
          font-size: ${FONT_SIZE.button};
          font-weight: ${FONT_WEIGHT.button};
          font-family: ${montserrat.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}
