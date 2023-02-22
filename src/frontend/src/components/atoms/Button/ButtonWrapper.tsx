import { MouseEventHandler } from "react";
import styled from "styled-components";
import { BackgroundColorType } from "@styles/theme";

interface ButtonWrapperProps {
  onClick: MouseEventHandler<HTMLDivElement>;
  width?: number | string;
  height?: number | string;
  ph?: number;
  active?: boolean;
  blur?: boolean;
  hoverBackgroundColor?: BackgroundColorType;
}

const ButtonWrapper = styled.div<ButtonWrapperProps>`
  display: flex;
  align-items: center;
  width: ${({ width }) => (width === "100%" ? "100%" : `${width}px`)};
  height: ${({ height }) => (height === "100%" ? "100%" : `${height}px`)};
  color: ${({ theme, color, active }) => theme.color[active ? "white" : color]};
  background-color: ${({ theme, active }) =>
    theme.backgroundColor[active ? "active" : "trans"]};
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

ButtonWrapper.defaultProps = {
  active: false,
  width: "100%",
  height: "100%",
  ph: 8,
  blur: false,
  hoverBackgroundColor: "hover",
};

export default ButtonWrapper;
