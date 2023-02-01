import { createGlobalStyle, css } from "styled-components";
import reset from "styled-reset";
import ggsansMedium from "../fonts/ggsansMedium.ttf";
import ggsansBold from "../fonts/ggsansBold.ttf";

const GlobalStyle = createGlobalStyle`${css`
  ${reset};

  @font-face {
    font-family: "gg sans Medium";
    src: local("gg sans Medium"), local("ggsansMedium"), url(${ggsansMedium}) format("truetype");
    font-style: normal;
  }
  @font-face {
    font-family: "gg sans Bold";
    src: local("gg sans Bold"), local("ggsansBold"), url(${ggsansBold}) format("truetype");
    font-style: bold;
  }

  html {
    font-family: "gg sans", "Apple SD Gothic Neo", NanumBarunGothic, "le 15", "Malgun Gothic", Gulim, 굴림, Dotum, 돋움, "Noto Sans", "Helvetica Neue",
      Helvetica, Arial, sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 1rem;
  }
  * {
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
    cursor: pointer;
    color: inherit;
  }
  input {
    outline: none;
  }
  button {
    border: none;
    padding: 0;
    cursor: pointer;
  }
`}`;

export default GlobalStyle;
