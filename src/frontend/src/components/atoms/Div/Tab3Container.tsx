import { ReactElement } from "react";
import styled from "styled-components";

interface Tab3ContainerProps {
  children: ReactElement;
}

const Tab3Container = ({ children }: Tab3ContainerProps) => {
  return <Tab3>{children}</Tab3>;
};

const Tab3 = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor.tab3};
  flex: 1;
`;

export default Tab3Container;
