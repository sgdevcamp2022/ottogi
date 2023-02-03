import { ReactElement } from "react";
import styled from "styled-components";

interface Tab3HeaderProps {
  children: ReactElement;
}

const Tab3Header = ({ children }: Tab3HeaderProps) => {
  return <Tab3HeaderContainer>{children}</Tab3HeaderContainer>;
};

const Tab3HeaderContainer = styled.div`
  height: 48px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 0.5rem;
`;

export default Tab3Header;
