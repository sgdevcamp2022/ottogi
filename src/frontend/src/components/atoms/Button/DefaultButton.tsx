import { MouseEventHandler } from "react";
import styled from "styled-components";
import { BorderColorType, ColorType, FontSizeType } from "@styles/theme";

interface DefaultButtonProps {
  isInviteButton?: boolean;
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  width?: number | null;
  height?: number | null;
  fontSize?: FontSizeType;
  fontWeight?: "normal" | "bold";
  color?: ColorType;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  disabled?: boolean;
  borderColor?: BorderColorType;
  mb?: number;
  ph?: number;
  pv?: number;
}

const DefaultButton = ({
  isInviteButton = false,
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
      isInviteButton={isInviteButton}
      backgroundColor={
        isInviteButton
          ? disabled
            ? "rgba(69,73,239,0.6)"
            : "rgb(69,73,239)"
          : backgroundColor
      }
      borderColor={borderColor}
      hoverBackgroundColor={
        isInviteButton
          ? disabled
            ? "rgba(69,73,239,0.6)"
            : "rgb(69,73,239)"
          : hoverBackgroundColor
      }
      mb={mb}
      ph={ph}
      pv={pv}
    >
      {text}
    </DefaultButtonContainer>
  );
};

const DefaultButtonContainer = styled.button<
  Omit<DefaultButtonProps, "text" | "onClick">
>`
  border: none;
  border-radius: 4px;
  width: ${({ width }) => (width === null ? "100%" : `${width}px`)};
  height: ${({ height }) => (height === null ? "100%" : `${height}px`)};
  font-size: ${({ theme, fontSize }) => theme.fontSize[fontSize]};
  color: ${({ theme, color }) => theme.color[color]};
  background-color: ${({ theme, isInviteButton, backgroundColor }) =>
    isInviteButton ? backgroundColor : theme.backgroundColor[backgroundColor]};
  font-weight: ${({ fontWeight }) => fontWeight};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  margin-bottom: ${({ mb }) => mb}px;
  padding: ${({ ph, pv }) => `${pv}px ${ph}px`};
  border: 1px solid
    ${({ theme, borderColor }) => theme.borderColor[borderColor]};
  &:hover {
    background-color: ${({ theme, isInviteButton, hoverBackgroundColor }) =>
      isInviteButton
        ? hoverBackgroundColor
        : theme.backgroundColor[hoverBackgroundColor]};
  }
`;

export default DefaultButton;
