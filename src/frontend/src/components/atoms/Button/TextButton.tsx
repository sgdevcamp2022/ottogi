import { MouseEventHandler } from "react";
import styled from "styled-components";
import { BackgroundColorType, ColorType } from "@styles/theme";
interface TextButtonProps {
  text: string;
  onClick: MouseEventHandler<HTMLSpanElement>;
  color?: ColorType;
  backgroundColor?: BackgroundColorType;
  hoverColor?: ColorType;
  hoverBackgroundColor?: BackgroundColorType;
}

const TextButton = ({
  text,
  color = "white",
  backgroundColor = "trans",
  hoverColor = color,
  hoverBackgroundColor = backgroundColor,
  onClick,
}: TextButtonProps) => {
  return (
    <TextButtonContainer
      onClick={onClick}
      color={color}
      backgroundColor={backgroundColor}
      hoverColor={hoverColor}
      hoverBackgroundColor={hoverBackgroundColor}
    >
      {text}
    </TextButtonContainer>
  );
};

const TextButtonContainer = styled.span<
  Omit<TextButtonProps, "text" | "onClick">
>`
  display: inline-block;
  color: ${({ theme, color }) => theme.color[color]};
  background-color: ${({ theme, backgroundColor }) =>
    theme.backgroundColor[backgroundColor]};
  font-weight: bold;
  border-radius: 4px;
  text-align: center;
  margin: 0 0.5rem;
  padding: 0.125rem 0.5rem;
  cursor: pointer;
  &:hover {
    color: ${({ theme, hoverColor }) => theme.color[hoverColor]};
    background-color: ${({ theme, hoverBackgroundColor }) =>
      theme.backgroundColor[hoverBackgroundColor]};
  }
`;

export default TextButton;
