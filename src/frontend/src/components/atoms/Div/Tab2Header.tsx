import { ReactElement } from "react";
import styled from "styled-components";

interface Tab2HeaderProps {
  children: ReactElement;
}

const Tab2Header = ({ children }: Tab2HeaderProps) => {
  return <Tab2HeaderContainer>{children}</Tab2HeaderContainer>;
};

const Tab2HeaderContainer = styled.div`
  padding: 0 0.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 48px;
`;

export default Tab2Header;
