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
  | "modal"
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
  | "voice-hangup"
  | "alert";

export type ColorType =
  | "inherit"
  | "white"
  | "msg"
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
  | "blue"
  | "invite-success"
  | "invite-danger";

export type BorderColorType = "divider" | "default" | "focus" | "success" | "danger";

export type StatusColorType = "on" | "off" | "empty" | "mobile" | "disturb";

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
  modal: string;
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
  alert: string;
}

interface Color {
  inherit: string;
  white: string;
  msg: string;
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
  "invite-success": string;
  "invite-danger": string;
}

interface BorderColor {
  divider: string;
  default: string;
  focus: string;
  success: string;
  danger: string;
}

interface StatusColor {
  on: string;
  off: string;
  empty: string;
  mobile: string;
  disturb: string;
}
interface ThemeType {
  fontSize: FontSize;
  backgroundColor: BackgroundColor;
  color: Color;
  borderColor: BorderColor;
  statusColor: StatusColor;
}

const theme: ThemeType = {
  fontSize: {
    xxs: ".625rem", //10px
    xs: ".75rem", // 12px
    sm: ".875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    xxl: "1.5rem", // 24px
    xxxl: "2.25rem", // 36px
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
    modal: "#39363f",
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
    alert: "#e4ac56",
  },
  color: {
    inherit: "inherit",
    white: "#FFFFFF",
    msg: "#DCDDDE",
    icon: "#b9bbbe",
    "tab3-header": "#B9BBBE",
    "msg-hover": "#B9BBBE",
    "setting-tab": "#B9BBBE",
    "msg-placeholder": "#72767D",
    "auth-label": "#A3A6AA",
    "auth-desc": "#A3A6AA",
    "tab2-placeholder": "#A3A6AA",
    "msg-timestamp": "#A3A6AA",
    inactive: "#96989D",
    "hangup-log": "#96989D",
    "setting-header": "#96989D",
    "tab1-plus": "#3BA55D",
    "voice-modal": "#18191C",
    red: "#ED4245",
    blue: "#00AFF4",
    "invite-success": "#46c46e",
    "invite-danger": "#f38688",
  },
  borderColor: {
    divider: "#4F545C7A",
    default: "#16181a",
    success: "#3ba55c",
    focus: "#4c9ed8",
    danger: "#ED4245",
  },
  statusColor: {
    on: "#3ba55c",
    off: "#b9bbbe",
    empty: "#faa61b",
    mobile: "#3ba55c",
    disturb: "#c74945",
  },
};

export default theme;
