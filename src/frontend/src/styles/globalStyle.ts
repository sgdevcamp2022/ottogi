import { createGlobalStyle, css } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`${css`
  ${reset}
  @font-face {
    font-family: "ggsans-Normal";
    src: url("../assets/fonts/ggsans-Normal.woff") format("truetype");
    font-style: normal;
  }
  @font-face {
    font-family: "ggsans-Semibold";
    src: url("f@onts/ggsans-Semibold.woff") format("truetype");
    font-style: 500;
  }
  @font-face {
    font-family: "ggsans-Bold";
    src: url("@fonts/ggsans-Bold.woff") format("truetype");
    font-style: bold;
  }

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

  * {
    box-sizing: border-box;
  }
  body {
    font-family: Apple SD Gothic Neo, NanumBarunGothic, "맑은 고딕",
      "Malgun Gothic", Gulim, 굴림, Dotum, 돋움, "Noto Sans", "Helvetica Neue",
      Helvetica, Arial, sans-serif;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  input,
  textarea {
    -moz-user-select: auto;
    -webkit-user-select: auto;
    -ms-user-select: auto;
    user-select: auto;
  }
  input:focus {
    outline: none;
  }
  button {
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
  }
`}`;

export default GlobalStyle;
