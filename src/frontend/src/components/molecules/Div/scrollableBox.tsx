import { ReactElement } from "react";
import styled from "styled-components";

interface ScrollableBoxProps {
  children: ReactElement;
}

const ScrollableBox = ({ children }: ScrollableBoxProps) => {
  return <ScrollableContainer>{children}</ScrollableContainer>;
};

const ScrollableContainer = styled.div`
  /* background-color: red; */
  width: 100%;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 8px; /* 스크롤바의 너비 */
  }
  ::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: ${({ theme }) =>
      theme.backgroundColor.tab1}; /* 스크롤바의 색상 */
    border-radius: 25px;
  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }) =>
      theme.backgroundColor.tab2}; /*스크롤바 뒷 배경 색상*/
  }
`;

export default ScrollableBox;
