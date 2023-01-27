import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import GGsansMedium from "../fonts/ggsansMedium.ttf";
import GGsansBold from "../fonts/ggsansBold.ttf";

const GlobalStyle = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: 'gg sans Medium';
    src: local('gg sans Medium'), local('ggsansMedium'), url(${GGsansMedium}) format('truetype');
    font-style: normal;
  }
  @font-face {
    font-family: 'gg sans Bold';
    src: local('gg sans Bold'), local('ggsansBold'), url(${GGsansBold}) format('truetype');
    font-style: bold;
  }

  html {
    font-family: 'gg sans Medium';
  }
`;

export default GlobalStyle;
