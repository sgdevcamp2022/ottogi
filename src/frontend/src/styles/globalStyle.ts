import { createGlobalStyle, css } from "styled-components";
import reset from "styled-reset";
import ggSansNormal from "../fonts/ggsansNormal.ttf";
import ggSansBold from "../fonts/ggsansBold.ttf";

const GlobalStyle = createGlobalStyle`${css`
  ${reset};

  @font-face {
    font-family: "NanumBarunGothic";
    font-style: normal;
    font-weight: 400;
    src: url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.eot");
    src: url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.eot?#iefix")
        format("embedded-opentype"),
      url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.woff")
        format("woff"),
      url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWeb.ttf")
        format("truetype");
  }

  @font-face {
    font-family: "NanumBarunGothic";
    font-style: normal;
    font-weight: 700;
    src: url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebBold.eot");
    src: url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebBold.eot?#iefix")
        format("embedded-opentype"),
      url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebBold.woff")
        format("woff"),
      url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebBold.ttf")
        format("truetype");
  }

  @font-face {
    font-family: "NanumBarunGothic";
    font-style: normal;
    font-weight: 300;
    src: url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebLight.eot");
    src: url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebLight.eot?#iefix")
        format("embedded-opentype"),
      url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebLight.woff")
        format("woff"),
      url("//cdn.jsdelivr.net/font-nanumlight/1.0/NanumBarunGothicWebLight.ttf")
        format("truetype");
  }

  @font-face {
    font-family: "ggSans";
    src: url(${ggSansNormal}) format("truetype");
    font-style: normal;
  }
  /* @font-face {
    font-family: "ggSans";
    src: url(${ggSansBold}) format("truetype");
    font-style: bold;
  } */

  html {
    font-family: "ggSans", Apple SD Gothic Neo, NanumBarunGothic, "맑은 고딕",
      "Malgun Gothic", Gulim, 굴림, Dotum, 돋움, "Noto Sans", "Helvetica Neue",
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
