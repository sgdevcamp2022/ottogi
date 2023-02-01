import { MouseEventHandler, ReactElement } from "react";
import styled from "styled-components";

interface MicButtonProps {
  OnIcon: ReactElement;
  OffIcon: ReactElement;
  onClick: MouseEventHandler<HTMLDivElement>;
  on?: boolean;
}

const UserOnOffButton = ({ OnIcon, OffIcon, on = false, onClick }: MicButtonProps) => {
  return (
    <MicButtonContainer onClick={onClick}>
      <IconContainer>{on ? OnIcon : OffIcon}</IconContainer>
    </MicButtonContainer>
  );
};

const MicButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  color: ${({ theme }) => theme.color["grey-4"]};
  background-color: ${({ theme }) => theme.backgroundColor.white};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.backgroundColor["grey-4"]};
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

export default UserOnOffButton;
