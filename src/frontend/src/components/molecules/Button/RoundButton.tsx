import { ReactElement } from "react";
import styled from "styled-components";
import { flexCenter } from "../../../styles/flexCenter";

interface RoundButtonProps {
  Icon: ReactElement;
}

const RoundButton = ({ Icon }: RoundButtonProps) => {
  return <RoundButtonContainer>{Icon}</RoundButtonContainer>;
};

const RoundButtonContainer = styled.div`
  ${flexCenter}
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 6.25rem;
  background-color: ${({ theme }) => theme.backgroundColor.tab2};
  cursor: pointer;
  color: ${({ theme }) => theme.color.icon};
  &:hover {
    color: ${({ theme }) => theme.color.white};
  }
`;

export default RoundButton;
