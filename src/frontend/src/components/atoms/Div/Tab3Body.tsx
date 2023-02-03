import { ReactElement } from "react";
import styled from "styled-components";

interface Tab3BodyProps {
  children: ReactElement;
}

const Tab3Body = ({ children }: Tab3BodyProps) => {
  return <Tab3BodyContainer>{children}</Tab3BodyContainer>;
};

const Tab3BodyContainer = styled.div``;

export default Tab3Body;
