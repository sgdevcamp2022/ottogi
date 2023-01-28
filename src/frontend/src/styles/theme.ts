export type FontSizeType = "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
export type BackgroundColorType =
  | "primary"
  | "black-1"
  | "black-2"
  | "grey-1"
  | "grey-2"
  | "grey-3"
  | "grey-4"
  | "green-1"
  | "green-2"
  | "orange"
  | "border";
export type ColorType = "white" | "black-1" | "black-2" | "grey-1" | "grey-2" | "grey-3" | "grey-4" | "blue" | "red-1" | "red-2";

interface FontSize {
  xs: string;
  sm: string;
  base: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
}

interface BackgroundColor {
  primary: string;
  "black-1": string;
  "black-2": string;
  "grey-1": string;
  "grey-2": string;
  "grey-3": string;
  "grey-4": string;
  "green-1": string;
  "green-2": string;
  orange: string;
  border: string;
}

interface Color {
  white: string;
  "black-1": string;
  "black-2": string;
  "grey-1": string;
  "grey-2": string;
  "grey-3": string;
  "grey-4": string;
  blue: string;
  "red-1": string;
  "red-2": string;
}

interface ThemeType {
  fontSize: FontSize;
  backgroundColor: BackgroundColor;
  color: Color;
}

const theme: ThemeType = {
  fontSize: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "2rem", // 32px
  },
  backgroundColor: {
    primary: "#5a68ea",
    "black-1": "#202225",
    "black-2": "#18191c",
    "grey-1": "#2f3136",
    "grey-2": "#4f545c",
    "grey-3": "#747f8d",
    "grey-4": "#e3e5e8",
    "green-1": "#447b4c",
    "green-2": "#3ba55c",
    orange: "#faa61a",
    border: "#4f545c7a",
  },
  color: {
    white: "#fff",
    "black-1": "#060607",
    "black-2": "#4f5660",
    "grey-1": "#96989d",
    "grey-2": "#a3a6aa",
    "grey-3": "#b9bbbe",
    "grey-4": "#dcddde",
    blue: "#4ca7e5",
    "red-1": "#ed4245",
    "red-2": "#c74945",
  },
};

export default theme;
