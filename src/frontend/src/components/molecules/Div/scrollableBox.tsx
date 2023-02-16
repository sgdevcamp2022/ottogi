import styled from "styled-components";

const ScrollableBox = styled.div`
  width: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;

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
