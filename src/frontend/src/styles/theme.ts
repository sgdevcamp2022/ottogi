export type FontSizeType = "xxs" | "xs" | "sm" | "base" | "lg" | "xl" | "xxl" | "xxxl";

export type BackgroundColorType =
  | "trans"
  | "white"
  | "primary"
  | "blocked"
  | "active"
  | "divider"
  | "setting"
  | "msg-input"
  | "hover"
  | "tab3"
  | "tab2"
  | "user-tab"
  | "voice-nobody"
  | "voice-icon"
  | "tab1"
  | "voice-modal"
  | "msg-hover"
  | "add-friend"
  | "random-green"
  | "voice-hangup";
export type ColorType =
  | "white"
  | "icon"
  | "msg-placeholder"
  | "auth-label"
  | "auth-desc"
  | "tab2-placeholder"
  | "msg-timestamp"
  | "tab3-header"
  | "msg-hover"
  | "setting-tab"
  | "inactive"
  | "hangup-log"
  | "setting-header"
  | "tab1-plus"
  | "voice-modal"
  | "red"
  | "blue";

export type BorderColorType = "divider" | "default" | "focus" | "success";
interface FontSize {
  xxs: string;
  xs: string;
  sm: string;
  base: string;
  lg: string;
  xl: string;
  xxl: string;
  xxxl: string;
}

interface BackgroundColor {
  trans: string;
  white: string;
  primary: string;
  blocked: string;
  active: string;
  divider: string;
  setting: string;
  "msg-input": string;
  hover: string;
  tab3: string;
  tab2: string;
  "user-tab": string;
  "voice-nobody": string;
  "voice-icon": string;
  tab1: string;
  "voice-modal": string;
  "msg-hover": string;
  "add-friend": string;
  "random-green": string;
  "voice-hangup": string;
}

interface Color {
  white: string;
  icon: string;
  "msg-placeholder": string;
  "auth-label": string;
  "auth-desc": string;
  "tab2-placeholder": string;
  "msg-timestamp": string;
  "tab3-header": string;
  "msg-hover": string;
  "setting-tab": string;
  inactive: string;
  "hangup-log": string;
  "setting-header": string;
  "tab1-plus": string;
  "voice-modal": string;
  red: string;
  blue: string;
}

interface BorderColor {
  divider: string;
  default: string;
  focus: string;
  success: string;
}

interface ThemeType {
  fontSize: FontSize;
  backgroundColor: BackgroundColor;
  color: Color;
  borderColor: BorderColor;
}

const theme: ThemeType = {
  fontSize: {
    xxs: "10px", //.625rem
    xs: "12px", // .75rem
    sm: ".875rem", // .875rem
    base: "1rem", // 1rem
    lg: "1.125rem", // 1.125rem
    xl: "1.25rem", // 1.25rem
    xxl: "1.5rem", // 1.5rem
    xxxl: "2.25rem", // 2.25rem
  },
  backgroundColor: {
    trans: "transparent",
    white: "#FFFFFF",
    primary: "#5865F2",
    blocked: "#8E9297",
    active: "#4F545C99",
    divider: "#4F545C7A",
    setting: "#4F545C",
    "msg-input": "#40444B",
    hover: "#3C3F44",
    tab3: "#36393F",
    tab2: "#2F3136",
    "user-tab": "#292B2F",
    "voice-nobody": "#20222501",
    "voice-icon": "#2F3136",
    tab1: "#202225",
    "voice-modal": "#18191C",
    "msg-hover": "#04040512",
    "add-friend": "#2D7D46",
    "random-green": "#3DA45C",
    "voice-hangup": "#ED4245",
  },
  color: {
    white: "#FFFFFF",
    icon: "#F6F6F7",
    "msg-placeholder": "#DCDDDE",
    "auth-label": "#A3A6AA91",
    "auth-desc": "#A3A6AA92",
    "tab2-placeholder": "#A3A6AA93",
    "msg-timestamp": "#A3A6AA94",
    "tab3-header": "#B9BBBE91",
    "msg-hover": "#B9BBBE92",
    "setting-tab": "#B9BBBE93",
    inactive: "#96989D91",
    "hangup-log": "#96989D92",
    "setting-header": "#96989D93",
    "tab1-plus": "#3BA55D",
    "voice-modal": "#18191C",
    red: "#ED4245",
    blue: "#00AFF4",
  },
  borderColor: {
    divider: "#4F545C7A",
    default: "#16181a",
    success: "#496e51",
    focus: "#4c9ed8",
  },
};

export default theme;
