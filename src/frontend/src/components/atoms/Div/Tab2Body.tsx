import { ReactElement } from "react";
import styled from "styled-components";

interface Tab2BodyProps {
  children: ReactElement;
}

const Tab2Body = ({ children }: Tab2BodyProps) => {
  return <Tab2BodyContainer>{children}</Tab2BodyContainer>;
};

const Tab2BodyContainer = styled.div`
  padding-left: 8px;
  padding-right: 8px;
  flex: 1;
`;

export default Tab2Body;
