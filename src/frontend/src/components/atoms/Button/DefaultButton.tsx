import { MouseEventHandler } from "react";
import styled from "styled-components";
import { BackgroundColorType, ColorType } from "../../../styles/theme";

interface DefaultButtonProps {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  fontWeight?: "normal" | "bold";
  color?: ColorType;
  backgroundColor?: BackgroundColorType;
  disabled?: boolean;
}

const DefaultButton = ({
  text,
  onClick,
  fontWeight = "normal",
  color = "white",
  backgroundColor = "primary",
  disabled = false,
}: DefaultButtonProps) => {
  return (
    <DefaultButtonContainer disabled={disabled} onClick={onClick} fontWeight={fontWeight} color={color} backgroundColor={backgroundColor}>
      {text}
    </DefaultButtonContainer>
  );
};

export const DefaultButtonContainer = styled.button<{
  color: ColorType;
  backgroundColor: BackgroundColorType;
  fontWeight: "normal" | "bold";
}>`
  width: 100%;
  height: 100%;
  font-size: 16px;
  border: none;
  color: "white";
  background-color: "red";
  /* color: ${({ theme, color }) => theme.color[color]}; */
  /* background-color: ${({ theme, backgroundColor }) => theme.backgroundColor[backgroundColor]}; */
  font-weight: ${({ fontWeight }) => fontWeight};
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
`;

export default DefaultButton;
