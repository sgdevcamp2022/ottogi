import { MouseEventHandler } from "react";
import styled from "styled-components";
import { BackgroundColorType, ColorType } from "@styles/theme";

interface ButtonProps {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  fontWeight?: "normal" | "bold";
  color?: ColorType;
  backgroundColor?: BackgroundColorType;
  disabled?: boolean;
}

const FieldButton = ({
  text,
  onClick,
  fontWeight = "normal",
  color = "white",
  backgroundColor = "primary",
  disabled = false,
}: ButtonProps) => {
  return (
    <ButtonContainer
      disabled={disabled}
      onClick={onClick}
      fontWeight={fontWeight}
      color={color}
      backgroundColor={backgroundColor}
    >
      {text}
    </ButtonContainer>
  );
};

export const ButtonContainer = styled.button<
  Omit<ButtonProps, "text" | "onClick">
>`
  text-align: center;
  border: none;
  width: 100%;
  height: 100%;
  font-size: 14px;
  padding: 0.125rem 1rem;
  color: ${({ theme, color }) => theme.color[color]};
  background-color: ${({ theme, backgroundColor }) =>
    theme.backgroundColor[backgroundColor]};
  font-weight: ${({ fontWeight }) => fontWeight};
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    opacity: 1;
    color: ${({ theme }) => theme.color["white"]};
    background-color: ${({ theme }) => theme.backgroundColor["setting"]};
  }
`;

export default FieldButton;
