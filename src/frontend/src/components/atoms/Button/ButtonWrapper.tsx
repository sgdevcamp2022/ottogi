import React, { MouseEventHandler } from "react";
import styled from "styled-components";
import { BackgroundColorType, ColorType } from "../../../styles/theme";

interface ButtonWrapperProps {
  children: React.ReactElement;
  onClick: MouseEventHandler<HTMLDivElement>;
  width?: number | null;
  height?: number | null;
  ph?: number;
  active?: boolean;
  blur?: boolean;
  hoverBackgroundColor?: BackgroundColorType;
}

const ButtonWrapper = ({
  children,
  onClick,
  active = false,
  width = null,
  height = null,
  ph = 8,
  blur = false,
  hoverBackgroundColor = "hover",
}: ButtonWrapperProps) => {
  return (
    <ButtonWrapperContainer
      onClick={onClick}
      width={width}
      height={height}
      color={active ? "white" : "inactive"}
      backgroundColor={active ? "active" : "trans"}
      ph={ph}
      blur={blur}
      hoverBackgroundColor={hoverBackgroundColor}
    >
      {children}
    </ButtonWrapperContainer>
  );
};

interface ButtonWrapperContainerProps {
  width: number | null;
  height: number | null;
  color: ColorType;
  backgroundColor: BackgroundColorType;
  hoverBackgroundColor: BackgroundColorType;
  ph: number;
  blur?: boolean;
}

const ButtonWrapperContainer = styled.div<ButtonWrapperContainerProps>`
  display: flex;
  align-items: center;
  width: ${({ width }) => (width === null ? "100%" : `${width}px`)};
  height: ${({ height }) => (height === null ? "100%" : `${height}px`)};
  color: ${({ theme, color }) => theme.color[color]};
  background-color: ${({ theme, backgroundColor }) => theme.backgroundColor[backgroundColor]};
  opacity: ${({ blur }) => (blur ? 30 : 100)}%;
  border-radius: 0.25rem;
  padding: 0 ${({ ph }) => ph}px;
  cursor: pointer;
  &:hover {
    opacity: 100%;
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme, hoverBackgroundColor }) => theme.backgroundColor[hoverBackgroundColor]};
  }
`;

export default ButtonWrapper;
