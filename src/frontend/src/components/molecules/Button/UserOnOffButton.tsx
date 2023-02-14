import { MouseEventHandler, ReactElement } from "react";
import styled from "styled-components";
import { flexCenter } from "@styles/flexCenter";
import Tip from "@components/atoms/Div/Tooltip";

interface MicButtonProps {
  text: string;
  OnIcon: ReactElement;
  OffIcon: ReactElement;
  onClick: MouseEventHandler<HTMLDivElement>;
  on?: boolean;
}

const UserOnOffButton = ({
  text,
  OnIcon,
  OffIcon,
  on = false,
  onClick,
}: MicButtonProps) => {
  return (
    <Tip title={text} place="top">
      <UserOnOffButtonContainer onClick={onClick}>
        <IconContainer>{on ? OnIcon : OffIcon}</IconContainer>
      </UserOnOffButtonContainer>
    </Tip>
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
