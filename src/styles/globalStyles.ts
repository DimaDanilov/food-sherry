import { Lato } from "next/font/google";

export const lato = Lato({
  subsets: ["latin"],
  weight: "400",
});

export const FONT_SIZE = {
  h1: "32px",
  h2: "24px",
  h3: "22px",
  input: "18px",
  p: "16px",
};

export const FONT_WEIGHT = {
  h1: "400",
  h2: "300",
  h3: "200",
};

export const COLORS = {
  mainColor: "#289672",
  white: "#fff",
  lightgray: "#bdbdbd",
  gray: "#848484",
  shadow: "rgba(0, 0, 0, 0.35)",
  shadowLanding: "rgba(26, 58, 23, 0.3)", // Shadow for landing page
  placeholder: "rgba(255, 255, 255, 0.6)",
};
