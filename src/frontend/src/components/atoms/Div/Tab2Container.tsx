import { ReactElement } from "react";
import styled from "styled-components";

interface Tab2ContainerProps {
  children: ReactElement;
}

const Tab2Container = ({ children }: Tab2ContainerProps) => {
  return <Tab2>{children}</Tab2>;
};

const Tab2 = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor.tab2};
  width: 15rem;
  display: flex;
  flex-direction: column;
`;

export default Tab2Container;
