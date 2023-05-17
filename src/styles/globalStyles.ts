import { Montserrat } from "next/font/google";

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["200", "300", "400"],
});

export const SIZES = {
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
};

export const FONT_SIZE = {
  h1: "28px",
  h2: "24px",
  h3: "22px",
  h4: "20px",
  h5: "18px",
  span: "18px",
  p: "16px",
  link: "16px",
  input: "18px",
  button: "18px",
  select: "18px",
  label: "18px",
};

export const FONT_WEIGHT = {
  default: "400",
  h1: "400",
  h2: "400",
  h3: "400",
  h4: "400",
  h5: "400",
  span: "300",
  p: "300",
  link: "400",
  input: "400",
  button: "400",
  select: "400",
  label: "400",
};

export const COLORS = {
  mainColor: "#289672",
  mainColorFilter:
    "invert(42%) sepia(61%) saturate(457%) hue-rotate(109deg) brightness(102%) contrast(90%)",
  mainHoverDark: "#007957",
  mainHoverLight: "#30B287",
  mainActive: "#005D3D",
  secondaryHover: "#EAEAEA",

  white: "#fff",
  black: "#000000",

  lightgray: "#bdbdbd",
  gray: "#848484",
  darkgray: "#606060",

  shadow: "rgba(0, 0, 0, 0.35)",
  shadowLanding: "rgba(26, 58, 23, 0.3)", // Shadow for landing page

  placeholderMain: "rgba(40, 150, 114, 0.6)",
  placeholderWhite: "rgba(255, 255, 255, 0.6)",
};
