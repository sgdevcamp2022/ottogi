import React, { MouseEventHandler } from "react";
import styled from "styled-components";

interface ButtonWrapperProps {
  children: React.ReactElement;
  onClick: MouseEventHandler<HTMLDivElement>;
  active?: boolean;
  height?: number;
  blur?: boolean;
}

const ButtonWrapper = ({ children, onClick, active = false, height = 42, blur = false }: ButtonWrapperProps) => {
  return (
    <ButtonWrapperContainer
      onClick={onClick}
      color={active ? "white" : "grey-3"}
      height={height}
      backgroundColor={active ? "grey-4" : "transparent"}
      blur={blur}
    >
      {children}
    </ButtonWrapperContainer>
  );
};

type backgroundColorType = "transparent" | "grey-3" | "grey-4";

const ButtonWrapperContainer = styled.div<{
  color: string;
  backgroundColor: backgroundColorType;
  height: number;
  blur?: boolean;
}>`
  display: flex;
  align-items: center;
  color: ${({ theme, color }) => theme.color[color]};
  min-height: ${({ height }) => height}px;
  background-color: ${({ theme, backgroundColor }) => theme.backgroundColor[backgroundColor]};
  opacity: ${({ blur }) => (blur ? 30 : 100)}%;
  border-radius: 0.25rem;
  padding: 0 8px;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.color.white};
    opacity: 100%;
    background-color: ${({ theme }) => theme.backgroundColor["grey-3"]};
  }
`;

export default ButtonWrapper;
