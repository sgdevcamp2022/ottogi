import { MouseEventHandler } from "react";
import styled from "styled-components";
import { BackgroundColorType, ColorType } from "@styles/theme";

interface SettingButtonProps {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  fontWeight?: "normal" | "bold";
  color?: ColorType;
  backgroundColor?: BackgroundColorType;
  disabled?: boolean;
}

const SetDefaultButton = ({
  text,
  onClick,
  fontWeight = "normal",
  color = "white",
  backgroundColor = "primary",
  disabled = false,
}: SettingButtonProps) => {
  return (
    <SettingButtonContainer
      onClick={onClick}
      fontWeight={fontWeight}
      color={color}
      backgroundColor={backgroundColor}
    >
      {text}
    </SettingButtonContainer>
  );
};

export const SettingButtonContainer = styled.button<
  Pick<SettingButtonProps, "color" | "backgroundColor" | "fontWeight">
>`
  margin-bottom: 4px;
  text-align: left;
  border: none;
  width: 100%;
  height: 100%;
  font-size: 16px;
  padding: 6px;
  box-sizing: border-box;
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

export default SetDefaultButton;
