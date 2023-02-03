import { ReactElement } from "react";
import styled from "styled-components";

interface PageContainerProps {
  children: ReactElement;
}

const PageContainer = ({ children }: PageContainerProps) => {
  return <Page>{children}</Page>;
};

const Page = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
`;

export default PageContainer;
