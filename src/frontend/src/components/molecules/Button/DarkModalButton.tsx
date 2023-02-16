import { MouseEventHandler, ReactElement } from "react";
import styled from "styled-components";
import { BackgroundColorType, ColorType, FontSizeType } from "@styles/theme";

interface DarkModalButtonProps {
  text: string;
  onClick: MouseEventHandler<HTMLDivElement>;
  color?: ColorType;
  hoverBackgroundColor?: BackgroundColorType;
  fontSize?: FontSizeType;
  Icon?: ReactElement;
}

const DarkModalButton = ({
  text,
  onClick,
  color = "auth-desc",
  hoverBackgroundColor = "primary",
  fontSize = "sm",
  Icon = <></>,
}: DarkModalButtonProps) => {
  return (
    <TextWrapper
      hoverBackgroundColor={hoverBackgroundColor}
      color={color}
      onClick={onClick}
    >
      <Text fontSize={fontSize}>{text}</Text>
      {Icon}
    </TextWrapper>
  );
};

const TextWrapper = styled.div<{
  hoverBackgroundColor: string;
  color: ColorType;
}>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 2px;
  height: 32px;
  margin: 2px 0px;
  padding: 6px 8px;
  color: ${({ theme, color }) => theme.color[color]};
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme, hoverBackgroundColor }) =>
      theme.backgroundColor[hoverBackgroundColor]};
  }
  svg {
    font-size: ${({ theme }) => theme.fontSize.lg};
  }
`;

const Text = styled.p<{
  fontSize: FontSizeType;
}>`
  line-height: 20px;
  font-size: ${({ theme, fontSize }) => theme.fontSize[fontSize]};
`;

export default DarkModalButton;
