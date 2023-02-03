import { MouseEventHandler, ReactElement } from "react";
import styled from "styled-components";
import { flexCenter } from "../../../styles/flexCenter";

interface MicButtonProps {
  OnIcon: ReactElement;
  OffIcon: ReactElement;
  onClick: MouseEventHandler<HTMLDivElement>;
  on?: boolean;
}

const UserOnOffButton = ({ OnIcon, OffIcon, on = false, onClick }: MicButtonProps) => {
  return (
    <UserOnOffButtonContainer onClick={onClick}>
      <IconContainer>{on ? OnIcon : OffIcon}</IconContainer>
    </UserOnOffButtonContainer>
  );
};

const UserOnOffButtonContainer = styled.div`
  ${flexCenter}
  width: 32px;
  height: 32px;
  border-radius: 4px;
  color: ${({ theme }) => theme.color.icon};
  background-color: ${({ theme }) => theme.backgroundColor.trans};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.backgroundColor.active};
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

export default UserOnOffButton;
