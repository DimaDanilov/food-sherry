import "@/styles/globals.css";
import {
  COLORS,
  FONT_SIZE,
  FONT_WEIGHT,
  montserrat,
} from "@/styles/globalStyles";
import type { AppProps } from "next/app";
import { auth } from "@/api/AuthApi";
import { useEffect } from "react";
import { useAuthStore } from "@/store/AuthStore";
import { IUser } from "@/models/User";

export default function App({ Component, pageProps }: AppProps) {
  const authStore = useAuthStore();

  useEffect(() => {
    const requestFrequency = 2000; //milliseconds

    const lastRequestTime = sessionStorage.getItem("lastRequestTime");
    const currentTime = Date.now();

    // If time from last request less than requestFrequency than setTimer
    if (
      lastRequestTime &&
      currentTime - Number(lastRequestTime) < requestFrequency
    ) {
      const timeLeft =
        requestFrequency - (currentTime - Number(lastRequestTime));
      const timerId = setTimeout(checkAuth, timeLeft);

      // return func to cancel timer if component unmount
      return () => clearTimeout(timerId);
    }

    checkAuth();

    async function checkAuth() {
      const token = localStorage.getItem("token");
      if (token) {
        const user: IUser = await auth(token);
        if (user.email) {
          authStore.setUser(user);
        }
      }
      authStore.setFirstLoadStatus(true);
      sessionStorage.setItem("lastRequestTime", String(currentTime));
    }
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
        h4 {
          font-size: ${FONT_SIZE.h4};
          font-weight: ${FONT_WEIGHT.h4};
          font-family: ${montserrat.style.fontFamily};
        }
        h5 {
          font-size: ${FONT_SIZE.h5};
          font-weight: ${FONT_WEIGHT.h5};
          font-family: ${montserrat.style.fontFamily};
        }
        span {
          font-size: ${FONT_SIZE.span};
          font-weight: ${FONT_WEIGHT.span};
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
        label {
          font-size: ${FONT_SIZE.label};
          font-weight: ${FONT_WEIGHT.label};
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
