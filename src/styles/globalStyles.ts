import { Montserrat } from "next/font/google";

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400"],
});

export const FONT_SIZE = {
  h1: "32px",
  h2: "24px",
  h3: "22px",
  p: "16px",
  link: "16px",
  input: "18px",
  button: "18px",
  select: "18px",
};

export const FONT_WEIGHT = {
  default: "500",
  h1: "500",
  h2: "500",
  h3: "500",
  p: "400",
  link: "400",
  input: "400",
  button: "400",
  select: "400",
};

export const COLORS = {
  mainColor: "#289672",
  mainColorFilter:
    "invert(42%) sepia(61%) saturate(457%) hue-rotate(109deg) brightness(102%) contrast(90%)",
  white: "#fff",
  lightgray: "#bdbdbd",
  gray: "#848484",
  shadow: "rgba(0, 0, 0, 0.35)",
  shadowLanding: "rgba(26, 58, 23, 0.3)", // Shadow for landing page
  placeholderMain: "rgba(40, 150, 114, 0.6)",
  placeholderWhite: "rgba(255, 255, 255, 0.6)",
};
