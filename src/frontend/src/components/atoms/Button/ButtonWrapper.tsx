import { MouseEventHandler, ReactElement } from "react";
import styled from "styled-components";
import { BackgroundColorType, ColorType } from "../../../styles/theme";

interface ButtonWrapperProps {
  children: ReactElement;
  onClick: MouseEventHandler<HTMLDivElement>;
  width?: number | string;
  height?: number | string;
  ph?: number;
  active?: boolean;
  blur?: boolean;
  hoverBackgroundColor?: BackgroundColorType;
}

const ButtonWrapper = ({
  children,
  onClick,
  active = false,
  width = "100%",
  height = "100%",
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
  width: number | string;
  height: number | string;
  color: ColorType;
  backgroundColor: BackgroundColorType;
  hoverBackgroundColor: BackgroundColorType;
  ph: number;
  blur?: boolean;
}

const ButtonWrapperContainer = styled.div<ButtonWrapperContainerProps>`
  display: flex;
  align-items: center;
  width: ${({ width }) => (width === "100%" ? "100%" : `${width}px`)};
  height: ${({ height }) => (height === "100%" ? "100%" : `${height}px`)};
  color: ${({ theme, color }) => theme.color[color]};
  background-color: ${({ theme, backgroundColor }) =>
    theme.backgroundColor[backgroundColor]};
  opacity: ${({ blur }) => (blur ? 30 : 100)}%;
  border-radius: 0.25rem;
  padding: 0 ${({ ph }) => ph}px;
  cursor: pointer;
  &:hover {
    opacity: 100%;
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme, hoverBackgroundColor }) =>
      theme.backgroundColor[hoverBackgroundColor]};
  }
`;

export default ButtonWrapper;
