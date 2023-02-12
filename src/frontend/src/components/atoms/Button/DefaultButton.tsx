import { MouseEventHandler } from "react";
import styled from "styled-components";
import {
  BackgroundColorType,
  BorderColorType,
  ColorType,
  FontSizeType,
} from "../../../styles/theme";

interface DefaultButtonProps {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  width?: number | null;
  height?: number | null;
  fontSize?: FontSizeType;
  fontWeight?: "normal" | "bold";
  color?: ColorType;
  backgroundColor?: BackgroundColorType;
  hoverBackgroundColor?: BackgroundColorType;
  disabled?: boolean;
  borderColor?: BorderColorType;
  mb?: number;
  ph?: number;
  pv?: number;
}

const DefaultButton = ({
  text,
  onClick,
  width = null,
  height = null,
  fontSize = "base",
  fontWeight = "normal",
  color = "white",
  backgroundColor = "primary",
  hoverBackgroundColor = "primary",
  disabled = false,
  borderColor = "trans",
  mb = 0,
  ph = 0,
  pv = 0,
}: DefaultButtonProps) => {
  return (
    <DefaultButtonContainer
      width={width}
      height={height}
      disabled={disabled}
      onClick={onClick}
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      hoverBackgroundColor={hoverBackgroundColor}
      mb={mb}
      ph={ph}
      pv={pv}
    >
      {text}
    </DefaultButtonContainer>
  );
};

interface DefaultButtonContainerProps {
  width: number | null;
  height: number | null;
  color: ColorType;
  backgroundColor: BackgroundColorType;
  hoverBackgroundColor: BackgroundColorType;
  fontSize: FontSizeType;
  fontWeight: "normal" | "bold";
  borderColor: BorderColorType;
  mb: number;
  ph: number;
  pv: number;
}

const DefaultButtonContainer = styled.button<DefaultButtonContainerProps>`
  border: none;
  border-radius: 4px;
  width: ${({ width }) => (width === null ? "100%" : `${width}px`)};
  height: ${({ height }) => (height === null ? "100%" : `${height}px`)};
  font-size: ${({ theme, fontSize }) => theme.fontSize[fontSize]};
  color: ${({ theme, color }) => theme.color[color]};
  background-color: ${({ theme, backgroundColor }) =>
    theme.backgroundColor[backgroundColor]};
  font-weight: ${({ fontWeight }) => fontWeight};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
  margin-bottom: ${({ mb }) => mb}px;
  padding: ${({ ph, pv }) => `${pv}px ${ph}px`};
  border: 1px solid
    ${({ theme, borderColor }) => theme.borderColor[borderColor]};
  &:hover {
    opacity: 0.7;
    background-color: ${({ theme, hoverBackgroundColor }) =>
      theme.backgroundColor[hoverBackgroundColor]};
  }
`;

export default DefaultButton;
