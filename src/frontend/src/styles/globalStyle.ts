import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import ggsansMedium from "../fonts/ggsansMedium.ttf";
import ggsansBold from "../fonts/ggsansBold.ttf";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'gg sans Medium';
    src: local('gg sans Medium'), local('ggsansMedium'), url(${ggsansMedium}) format('truetype');
    font-style: normal;
  }
  @font-face {
    font-family: 'gg sans Bold';
    src: local('gg sans Bold'), local('ggsansBold'), url(${ggsansBold}) format('truetype');
    font-style: bold;
  }


  ${reset}

  html, body, div, span, input, textarea, button {
    font-family: 'gg sans Medium';
    font-size: 16px;
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
